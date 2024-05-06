import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import ProsesOr from "./ProsesOrModule.js";
import Ujian from "./Ujian.js";
import BankSoal from "./BankSoalModels.js";

const { DataTypes } = Sequelize;

const SoalUjian = db.define('SoalUjian', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idUjian: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    idSoal: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },

},{
    tableName:"SoalUjian"
});

export default SoalUjian;

