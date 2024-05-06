import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import BankSoal from "./BankSoalModels.js";

const { DataTypes } = Sequelize;

const BankSoalMultiple = db.define('BankSoalMultiple', {
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
    },
    Pilihan1: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Pilihan2: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Pilihan3: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Pilihan4: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    kunci:{
        type: DataTypes.TEXT,
        allowNull: false,
    }
},{
    tableName:"BankSoalMultiple"
});

export default BankSoalMultiple;

