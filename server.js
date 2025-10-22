import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./db.js";
import { Master } from "./models/Master.js";
import "./cron.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Тестовый корень
app.get("/", (req, res) => res.send("Creative Team Backend работает 🚀"));

// Получить всех мастеров
app.get("/masters", async (req, res) => {
  const masters = await Master.findAll();
  res.json(masters);
});

// Добавить мастера
app.post("/masters", async (req, res) => {
  const master = await Master.create(req.body);
  res.json(master);
});

// Обновить мастера
app.put("/masters/:id", async (req, res) => {
  const master = await Master.findByPk(req.params.id);
  if (!master) return res.status(404).send("Не найден");
  await master.update(req.body);
  res.json(master);
});

// Удалить мастера
app.delete("/masters/:id", async (req, res) => {
  const master = await Master.findByPk(req.params.id);
  if (!master) return res.status(404).send("Не найден");
  await master.destroy();
  res.sendStatus(204);
});

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
});

