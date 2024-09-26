import { Sequelize } from "sequelize";
import db from "../../config/db.config.js";

const { DataTypes } = Sequelize;

const NilaiWawancara = db.define(
  "NilaiWawancara",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    idPesertaWawancara: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    idUsers: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    nilai_komitmen: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    nilai_sikap: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    nilai_percaya_diri: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    nilai_kejelasan_jawaban: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    nilai_konsisten_jawaban: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "nilaiwawancara",
  }
);

export default NilaiWawancara;
