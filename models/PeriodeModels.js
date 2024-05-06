import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import Labor from "./LaborModels.js";

const { DataTypes } = Sequelize;

const Periode = db.define('Periode', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nama_periode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jumlah_asisten: {
        type: DataTypes.INTEGER,
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
    tableName:"Periode"
});

export default Periode;

