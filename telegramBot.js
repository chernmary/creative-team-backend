import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: false });

export const sendTelegramMessage = async (message) => {
  try {
    await bot.sendMessage(process.env.CHAT_ID, message);
  } catch (err) {
    console.error("Ошибка отправки в Telegram:", err.message);
  }
};

