import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import ProsesOr from "./ProsesOrModule.js";

const { DataTypes } = Sequelize;

const Tahapan = db.define('Tahapan', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nama_tahapan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jenisTahapan:{
        type: DataTypes.ENUM('Wawancara','Ujian'),
        allowNull: false,
    },
    idProsesOr: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },

},{
    tableName:"Tahapan"
});

export default Tahapan;

