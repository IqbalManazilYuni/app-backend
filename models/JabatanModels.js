import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import Labor from "./LaborModels.js";

const { DataTypes } = Sequelize;

const Jabatan = db.define('Jabatan', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nama_jabatan: {
        type: DataTypes.STRING,
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
    tableName:"Jabatan"
});

export default Jabatan;

