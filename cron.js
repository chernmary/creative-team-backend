import cron from "node-cron";
import dayjs from "dayjs";
import { Master } from "./models/Master.js";
import { sendTelegramMessage } from "./telegramBot.js";

cron.schedule("0 9 * * *", async () => {
  const masters = await Master.findAll();
  const soonExpiring = masters.filter(m => {
    if (!m.medbook_expiry) return false;
    const diff = dayjs(m.medbook_expiry).diff(dayjs(), "day");
    return diff >= 0 && diff <= 7; // за 7 дней
  });

  if (soonExpiring.length) {
    const text =
      "⚠️ Напоминание о медкнижках:\n" +
      soonExpiring
        .map(m => `- ${m.full_name} — истекает ${m.medbook_expiry}`)
        .join("\n");

    await sendTelegramMessage(text);
  }
});

