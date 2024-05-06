import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import Labor from "./LaborModels.js";

const { DataTypes } = Sequelize;

const ProsesOr = db.define('ProsesOr', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    limitPeserta:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tahun:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    nama_proses:{
        type: DataTypes.TEXT,
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
    tableName:"Proses_OR"
});

export default ProsesOr;

