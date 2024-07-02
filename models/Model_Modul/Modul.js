import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const Modul = db.define('Modul', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nama_modul: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nama_file: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    idLabor: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    tahun: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "modul"
});

export default Modul;

