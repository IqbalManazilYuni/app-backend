import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import BankSoal from "./BankSoalModels.js";

const { DataTypes } = Sequelize;

const BankSoalEssay = db.define('BankSoalEssay', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    Soal: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
},{
    tableName:"BankSoalEssay"
});

export default BankSoalEssay;

