
const express = require("express");

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

app.get("/", (req, res) => {
  res.send("Xfinity bot backend is running!");
});

app.post("/telegram/webhook", async (req, res) => {
  if (
    !WEBHOOK_SECRET ||
    req.get("X-Telegram-Bot-Api-Secret-Token") !== WEBHOOK_SECRET
  ) {
    return res.sendStatus(401);
  }

  res.sendStatus(200);

  const message = req.body.message;
  if (!message || !message.text || !BOT_TOKEN) return;

  const chatId = message.chat.id;
  const text = message.text.trim();

  let reply;

  if (text === "/start") {
    reply = "Welcome to Xfinity! 👋 Your bot is now connected. How can I help you?";
  } else if (text === "/help") {
    reply = "Available commands:\n/start - Start the bot\n/help - Show this help message";
  }

  if (!reply) return;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: reply
      })
    });
  } catch (error) {
    console.error("Could not send Telegram reply:", error.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Xfinity bot server running on port ${PORT}`);
});
