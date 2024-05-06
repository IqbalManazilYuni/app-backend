import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import PesertaUjian from "./PesertaUjianModels.js";
import SoalUjian from "./SoalUjianModels.js";

const { DataTypes } = Sequelize;

const Jawaban = db.define('Jawaban', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    jawaban: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nilai: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idPesertaUjian: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    idSoalUjian: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
},{
    tableName:"Jawaban"
});

export default Jawaban;

