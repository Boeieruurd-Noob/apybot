# apybot

Node.js Telegram bot created using Telegraf that fetches TVL and APY statistics from Yieldly and other platforms on Algorand.

How to use:

1. Create a telegram bot.
2. Clone the repo to where you want to host the bot.
3. Create a .env file with your bot token.
4. Install all dependencies using npm install.
5. Update the webhook to refer to your own server.
6. Start the bot by navigating into the bot's directory and use: "node index.js"
7. Stop the bot using "shutdown"

The bot is also able to run in a local testenv by removing the webhook and using: "bot.launch()".

This is my first ever project written in JS, so the code is prob messy and full of mistakes.
