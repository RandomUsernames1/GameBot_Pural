I don’t have the ability to create files directly on your computer, but I can give you a ready-to-copy file content. Here’s exactly what to do:

1. Open a text editor (like Notepad, VS Code, Sublime, or any editor).
2. Create a new file and name it: `README.md`
3. Copy **everything below** into that file:

---

````markdown
# 🎮 GameBot for Hack.Chat 🎮

GameBot is a fun interactive chat bot for [Hack.Chat](https://hack.chat/) that allows users to play games, answer quizzes, and enjoy fun interactions directly in chat channels.

---

## 🚀 Features

### ✨ Luck Games
- `!coin` – Flip a coin  
- `!dice` – Roll a dice  
- `!lucky` – Random number (1-100)  
- `!yesno` – Yes or no answer  
- `!8ball <question>` – Magic 8-ball response  
- `!fortune` – Get a random fortune  
- `!roulette` – Random roulette number  

### ⚡ Skill / Guessing Games
- `!guess <1-10>` – Guess a number  
- `!higher / !lower` – Higher or lower game  
- `!math` – Solve a math problem  
- `!scramble` – Unscramble a word  
- `!typing` – Test your typing speed  
- `!rps <rock|paper|scissors>` – Play Rock Paper Scissors  
- `!odd / !even` – Guess if a number is odd or even  
- `!reaction` – Reaction speed test  

### 😂 Fun Commands
- `!wyr` – Would you rather question  
- `!truth` – Truth question  
- `!compliment` – Get a random compliment  
- `!insult` – Friendly insult  
- `!emoji` – Guess the emoji  
- `!joke` – Random joke  
- `!story` – Mini story generator  

### ⚔️ Multiplayer / Challenge Games
- `!duel <nick>` – Challenge another user to a duel  
- `!accept` – Accept a duel challenge  
- `!battle` – Mini battle game  
- `!quiz` – Start a trivia quiz  
- `!answer <your answer>` – Answer a quiz question  

---

## 🛠 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/gamebot.git
cd gamebot
````

2. Install dependencies:

```bash
npm install ws
```

3. Run the bot:

```bash
node bot.js
```

> The bot will automatically join the `lounge` channel with the nickname `GameBot_Pural`.

---

## ⚙ Configuration

* **Channel:** Change the channel by modifying the `CHANNEL` variable.
* **Nickname:** Change the bot nickname by modifying the `NICK` variable.

```js
const CHANNEL = 'lounge';
const NICK = 'GameBot_Pural';
```

---

## 📡 How It Works

* The bot connects to the Hack.Chat WebSocket server.
* It listens for chat messages starting with `!` and executes commands.
* Supports single-player games, multiplayer duels, quizzes, and random fun commands.
* Automatically sends the help menu every 30 minutes.

---

## 💡 Contributing

Feel free to fork this repo and add new commands or games. To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes
4. Submit a pull request

---

## 📜 License

This project is open-source and available under the MIT License.

```

---

Once you save it as `README.md`, it’s ready to use on GitHub.  

If you want, I can also make a **version with example bot outputs** so your README looks more lively on GitHub. Do you want me to do that next?
```
