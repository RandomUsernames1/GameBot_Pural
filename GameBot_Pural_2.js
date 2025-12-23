const WebSocket = require('ws');

const ws = new WebSocket('wss://hack.chat/chat-ws');
const CHANNEL = 'lounge';
const NICK = 'GameBot_Pural';

let lastNumber = Math.floor(Math.random() * 50) + 1;
let reactionActive = false;
let reactionStart = 0;
let duelPending = null;
let quizPending = null;

const send = text => ws.send(JSON.stringify({ cmd: 'chat', text }));

/* ---------- DATA ---------- */
const rand = (a,b) => Math.floor(Math.random()*(b-a+1))+a;

/* ---------- MEGA DATA (ULTRA EXPANDED) ---------- */

const words = [
// random / objects
'banana','keyboard','monitor','cloud','ocean','castle','forest','spaceship','rocket','satellite',
'guitar','piano','flower','sunshine','shadow','crystal','storm','ember','echo','vortex',

// tech / coding
'hacker','javascript','python','matrix','computer','robot','server','binary','glitch','algorithm',
'portal','dimension','pixel','quantum','neon','code','syntax','runtime','compile','packet',
'firewall','kernel','cache','thread','stack','array','object','function','promise','async',

// sci-fi / fantasy
'alien','wizard','dragon','unicorn','phoenix','myth','legend','void','plasma','cosmos',
'asteroid','comet','galaxy','nebula','orbit','gravity','eclipse','nova','meteor','engine',

// fun extras
'ninja','samurai','cyber','signal','pulse','vector','mythic','arcane','relic','beacon'
];

const emojis = [
'🔥','😂','💀','🚀','👀','😎','🐱','🐶','🍕','🍔','🎸','🎮','🌈','⚡','🌞','🌚',
'🦄','👻','💩','🥳','🤖','🧠','🎯','💥','🛸','🧩','🌀','🎲','📦','🧨','🔮','🪐',
'🕶️','🎧','🧪','📡','⚔️','🛡️','🧱','🦾','🧊','🌌','🪄','🎃','🪙','🎈','📀',
'💾','📟','📺','🔋','🔌','🛰️','🧭','⌛','⏳','🧠','🧿','🪬','🎮','🎲'
];

const truths = [
'What is your biggest fear?',
'What secret are you hiding?',
'Who do you trust most?',
'Have you ever cheated in a game?',
'What is your guilty pleasure?',
'Who was your first crush?',
'What is your most embarrassing moment?',
'Have you ever lied to your best friend?',
'What is something you regret?',
'What scares you the most at night?',
'What is a talent you wish you had?',
'Who do you admire the most?',
'What is your biggest weakness?',
'What makes you really angry?',
'What is your biggest dream?',
'What is something nobody knows about you?',
'What motivates you to keep going?',
'What is the best day of your life so far?',
'What do you overthink the most?',
'What makes you feel confident?',
'What drains your energy?',
'What is your comfort activity?',
'What would you change about your past?',
'What is something you are proud of?',
'What scares you about the future?',
'What do you avoid talking about?',
'What makes you feel accomplished?',
'What do you fear failing at?',
'What always cheers you up?',
'What do you want more time for?'
];

const wyr = [
// powers
'be invisible or fly?',
'read minds or see the future?',
'time travel or teleport?',
'control fire or control ice?',
'super strength or super speed?',
'never need sleep or never need food?',

// life
'be rich or famous?',
'be feared or respected?',
'always be lucky or always be skilled?',
'restart life or pause time?',
'know how you die or when you die?',
'live forever or live perfectly once?',

// tech / gaming
'play games at 10 FPS or 300 ping?',
'always lag or always crash?',
'lose your save files or lose your account?',
'have god aim or god reaction time?',
'never rage or never win?',
'only play singleplayer or only multiplayer?',

// funny
'fight 1 horse-sized duck or 100 duck-sized horses?',
'have spaghetti hair or sweat syrup?',
'only whisper or only shout?',
'hiccup every minute or sneeze confetti?',
'talk in memes or only emojis?',
'have permanent low battery or permanent lag?',

// choices
'live without music or without games?',
'lose your phone or lose your wallet?',
'have unlimited money or unlimited free time?',
'always tell the truth or always be lucky?',
'be a hero or a villain?',
'be stuck in a game or stuck in school forever?'
];

const compliments = [
'you are awesome!',
'you are smart!',
'you are legendary!',
'you have amazing style!',
'you are a coding genius!',
'you are a star!',
'you are incredibly creative!',
'you light up the room!',
'you have main character energy!',
'you are cracked at life!',
'you make chat better!',
'you are way smarter than you think!',
'you have elite vibes!',
'you are built different!',
'you are actually impressive!',
'you have big brain energy!',
'you are lowkey amazing!',
'you’re someone people respect!',
'you bring good energy!',
'you are surprisingly wise!',
'you always improve the vibe!',
'you stand out in a good way!',
'you’re fun to talk to!',
'you’ve got serious potential!'
];

const insults = [
'you smell like lag.',
'your wifi is weak.',
'even bots play better.',
'your typing is slow!',
'your joke was bad.',
'your code has bugs!',
'you forgot your homework again!',
'you talk too much in chat!',
'you run on low FPS.',
'your ping is emotional.',
'even autocorrect gave up on you.',
'your aim needs a tutorial.',
'you lag in real life.',
'your logic needs a patch.',
'NPC behavior detected.',
'skill issue detected.',
'your brain is buffering.',
'error 404: skill not found.',
'tutorial level still loading.',
'your brain needs a reboot.',
'AI would do better.',
'even RNG hates you.',
'you missed the obvious.',
'that was painful to watch.'
];

const jokes = [
'Why did the computer go to the doctor? It caught a virus!',
'Why did the scarecrow win an award? He was outstanding in his field!',
'Why don’t scientists trust atoms? Because they make up everything!',
'Why was the math book sad? It had too many problems!',
'Why did the gamer break up with the console? Too many arguments!',
'What do you call a fake noodle? An Impasta!',
'Why do bees have sticky hair? Because they use honeycombs!',
'Why did the chicken join a band? Because it had the drumsticks!',
'Why did the smartphone go to school? It wanted to be smarter!',
'Why don’t programmers like nature? Too many bugs.',
'Why was the keyboard tired? Too many shifts.',
'Why did the bot cross the road? To escape the ban hammer!',
'Why did the computer sit down? It needed a byte.',
'Why did the server go broke? Too many cache problems!',
'Why did the CPU get hot? Too many threads!',
'Why was the browser stressed? Too many tabs open!'
];

const fortunes = [
'You will have a lucky day!',
'A surprise is waiting for you.',
'Beware of unexpected challenges today.',
'Good fortune will come to you soon.',
'Your dreams will guide you to success.',
'An old friend will reconnect with you.',
'You will discover a hidden talent soon.',
'Today is a perfect day for new beginnings.',
'Something good will happen when you least expect it.',
'Your hard work will pay off.',
'A big opportunity is coming.',
'Trust your instincts today.',
'You will win something soon.',
'A small risk will bring a big reward.',
'Your patience will be rewarded.',
'Positive energy surrounds you.',
'Something you’ve waited for is close.',
'A challenge will make you stronger.',
'Your effort will be noticed.',
'Luck favors your next move.'
];

function helpMenu() {
return `# 🎮 GAMEBOT COMMANDS 🎮

## ✨ LUCK GAMES ✨
- \`!coin\` – Flip a coin
- \`!dice\` – Roll dice
- \`!lucky\` – Random number 1-100
- \`!yesno\` – Yes or no
- \`!8ball <question>\` – Magic 8-ball
- \`!fortune\` – Random fortune
- \`!roulette\` – Random roulette number

## ⚡ SKILL / GUESSING GAMES ⚡
- \`!guess <1-10>\` – Guess the number
- \`!higher / !lower\` – Higher or lower number
- \`!math\` – Quick math question
- \`!scramble\` – Word scramble
- \`!typing\` – Typing speed test
- \`!rps <rock|paper|scissors>\` – Rock paper scissors
- \`!odd / !even\` – Odd or even number
- \`!reaction\` – Reaction speed test

## 😂 FUN GAMES 😂
- \`!wyr\` – Would you rather
- \`!truth\` – Truth question
- \`!compliment\` – Random compliment
- \`!insult\` – Random friendly insult
- \`!emoji\` – Guess the emoji
- \`!joke\` – Random joke
- \`!story\` – Mini story generator

## ⚔️ MULTIPLAYER / CHALLENGE GAMES ⚔️
- \`!duel <nick>\` – Challenge someone
- \`!accept\` – Accept a duel challenge
- \`!battle\` – Mini battle game
- \`!quiz\` – Trivia quiz
- \`!answer <your answer>\` – Answer a quiz question`;
}

/* ---------- BOT SETUP ---------- */
ws.on('open', () => {
ws.send(JSON.stringify({ cmd: 'join', channel: CHANNEL, nick: NICK }));
setTimeout(() => send(helpMenu()), 1000);
});

/* ---------- MESSAGE HANDLER ---------- */
ws.on('message', data => {
let msg;
try { msg = JSON.parse(data); } catch { return; }
if (msg.cmd !== 'chat') return;

const text = msg.text;
const nick = msg.nick;
if (!text.startsWith('!')) return;

const args = text.split(' ');
const cmd = args[0].toLowerCase();

/* ---------- COMMANDS ---------- */
switch (cmd) {
/* HELP */
case '!help': send(helpMenu()); break;

/* LUCK */
case '!coin': send(`🪙 ${nick}: ${Math.random() < 0.5 ? 'Heads' : 'Tails'}`); break;
case '!dice': send(`🎲 ${nick} rolled ${rand(1,6)}`); break;
case '!lucky': send(`🍀 ${nick}, lucky number: ${rand(1,100)}`); break;
case '!yesno': send(`🤔 ${nick}: ${Math.random() < 0.5 ? 'Yes' : 'No'}`); break;
case '!8ball': send(`🎱 ${nick}: ${eightBall()}`); break;
case '!fortune': send(`🔮 ${nick}: ${fortunes[rand(0,fortunes.length-1)]}`); break;
case '!roulette': send(`🎰 ${nick}: number ${rand(0,36)}`); break;

/* SKILL / GUESSING */
case '!guess': guess(nick,args[1]); break;
case '!higher': higherLower(nick,'higher'); break;
case '!lower': higherLower(nick,'lower'); break;
case '!math': math(nick); break;
case '!scramble': scramble(); break;
case '!typing': typing(); break;
case '!rps': rps(nick,args[1]); break;
case '!odd': oddEven(nick,'odd'); break;
case '!even': oddEven(nick,'even'); break;
case '!reaction': reactionGame(); break;

/* FUN */
case '!wyr': send(`⚖️ ${nick}: Would you rather ${wyr[rand(0,wyr.length-1)]}`); break;
case '!truth': send(`🧠 ${nick}: ${truths[rand(0,truths.length-1)]}`); break;
case '!compliment': send(`💖 ${nick}, ${compliments[rand(0,compliments.length-1)]}`); break;
case '!insult': send(`😈 ${nick}, ${insults[rand(0,insults.length-1)]}`); break;
case '!emoji': send(`😶 ${nick}, guess the emoji: ${emojis[rand(0,emojis.length-1)]}`); break;
case '!joke': send(`😂 ${nick}: ${jokes[rand(0,jokes.length-1)]}`); break;
case '!story': send(`📖 ${nick}: Once upon a time ${words[rand(0,words.length-1)]}...`); break;

/* MULTIPLAYER / CHALLENGE */
case '!duel': initiateDuel(nick,args[1]); break;
case '!accept': acceptDuel(nick); break;
case '!battle': battle(nick); break;
case '!quiz': startQuiz(nick); break;
case '!answer': answerQuiz(nick,args.slice(1).join(' ')); break;
}

/* Reaction check */
if (reactionActive && text.toLowerCase() === 'go') {
const time = Date.now() - reactionStart;
reactionActive = false;
send(`⚡ ${nick} reacted in ${time}ms!`);
}
});

/* ---------- GAME FUNCTIONS ---------- */
function rps(nick, choice) {
const opts = ['rock','paper','scissors'];
if (!opts.includes(choice)) return send(`✋ ${nick}: Usage !rps rock|paper|scissors`);
const botChoice = opts[rand(0,2)];
let res = 'Tie!';
if ((choice==='rock'&&botChoice==='scissors')||(choice==='paper'&&botChoice==='rock')||(choice==='scissors'&&botChoice==='paper')) res='You win!';
else if(choice!==botChoice) res='You lose!';
send(`✊ ${nick}: ${choice} | Bot: ${botChoice} → ${res}`);
}

function guess(nick,num) {
const n=rand(1,10);
if(!num||isNaN(num)) return send(`🔢 ${nick}: Usage !guess 1-10`);
send(`🔢 ${nick} guessed ${num}. Number was ${n}`);
}

function higherLower(nick,pick) {
const next=rand(1,50);
const win=pick==='higher'?next>lastNumber:next<lastNumber;
send(`📈 Last: ${lastNumber}, New: ${next} → ${win?'WIN':'LOSE'}`);
lastNumber=next;
}

function math(nick) {
const a=rand(1,20),b=rand(1,20);
send(`🧮 ${nick}: What is ${a} + ${b}?`);
}

function scramble() {
const word=words[rand(0,words.length-1)];
send(`🔀 Unscramble: ${word.split('').sort(()=>0.5-Math.random()).join('')}`);
}

function typing() {
const w=words[rand(0,words.length-1)];
send(`⌨️ Type this fast: ${w}`);
}

function oddEven(nick,pick) {
const n=rand(1,20);
const win=(n%2===0&&pick==='even')||(n%2!==0&&pick==='odd');
send(`🎯 ${nick}: Number ${n} → ${win?'Correct!':'Wrong!'}`);
}

function reactionGame() {
if(reactionActive) return;
send('⏳ Get ready...');
setTimeout(()=>{
reactionActive=true;
reactionStart=Date.now();
send('🔥 GO');
},rand(1000,4000));
}

/* MULTIPLAYER FUNCTIONS */
function initiateDuel(challenger,target) {
if(!target) return send(`⚔️ ${challenger}: Usage !duel <nick>`);
if(duelPending) return send(`⚔️ Another duel is already pending!`);
duelPending = { challenger, target };
send(`⚔️ ${challenger} challenged ${target} to a duel! Type !accept to fight.`);
}

function acceptDuel(nick) {
if(!duelPending) return send(`⚔️ ${nick}: No duel pending.`);
if(nick !== duelPending.target) return send(`⚔️ ${nick}: You were not challenged.`);
const outcome = ['won','lost'][rand(0,1)];
send(`⚔️ Duel Result: ${duelPending.challenger} vs ${duelPending.target} → ${duelPending.target} ${outcome}!`);
duelPending = null;
}

function battle(nick) {
const outcome=['won','lost','tied'][rand(0,2)];
send(`⚔️ ${nick} battled a bot and ${outcome}!`);
}

/* QUIZ */
function startQuiz(nick) {
if(quizPending) return send(`❓ A quiz is already ongoing!`);
const a=rand(1,10),b=rand(1,10);
const answer=a+b;
quizPending = { question: `${a} + ${b}`, answer, asker: nick };
send(`❓ Quiz Time! ${nick} asks: What is ${a} + ${b}? Use !answer <your answer>`);
}

function answerQuiz(nick, ans) {
if(!quizPending) return send(`❓ No quiz active.`);
if(!ans || isNaN(ans)) return send(`❓ Usage: !answer <number>`);
if(Number(ans) === quizPending.answer) {
send(`✅ ${nick} answered correctly! The answer was ${quizPending.answer}.`);
quizPending = null;
} else {
send(`❌ ${nick} is wrong! Try again.`);
}
}

/* 8BALL */
function eightBall() {
const answers=['Yes','No','Maybe','Definitely','Ask again later','Absolutely not','Certainly','I don’t think so'];
return answers[rand(0,answers.length-1)];
}

// Send help message every 30 minutes (1800000 ms)
setInterval(() => {
send(helpMenu());
}, 1800000); // 30 minutes
