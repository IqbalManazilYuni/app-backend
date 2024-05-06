import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import Labor from "./LaborModels.js";

const { DataTypes } = Sequelize;

const Module = db.define('Module', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nama_module: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    file: {
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
    tableName:"Module"
});

export default Module;

