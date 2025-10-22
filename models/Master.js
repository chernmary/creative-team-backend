import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Master = sequelize.define("Master", {
  full_name: { type: DataTypes.STRING, allowNull: false },
  telegram_nick: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  roles: { type: DataTypes.ARRAY(DataTypes.STRING) },
  notes: { type: DataTypes.TEXT },
  availability: { type: DataTypes.STRING },
  privileges: { type: DataTypes.STRING },
  medbook_expiry: { type: DataTypes.DATEONLY }
});

