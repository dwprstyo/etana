import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Pegawai = db.define(
  "pegawai",
  {
    nik: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tanggal_masuk: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING
    },
  },
  {
    freezeTableName: true,
    paranoid: true
  }
);

export default Pegawai;

(async () => {
  await db.sync();
})();
