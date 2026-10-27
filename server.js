
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Xfinity Telegram bot backend is running!");
});

app.post("/telegram/webhook", (req, res) => {
  res.sendStatus(200);

  const message = req.body.message;

  if (!message || !message.text) return;

  const chatId = message.chat.id;
  const text = message.text;

  if (text === "/start") {
    console.log("Someone started the Xfinity bot. Chat ID:", chatId);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
