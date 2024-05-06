import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import Labor from "./LaborModels.js";

const { DataTypes } = Sequelize;

const BankSoal = db.define('BankSoal', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    tahun: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipeSoal:{
        type: DataTypes.ENUM('Essay','Pilihan Ganda'),
        allowNull: false,
    },
    idLabor: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },

},{
    tableName:"BankSoal"
});

export default BankSoal;

