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
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true,
    },
    file_path: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true,
        
    },
    idLabor: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },tahun: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    tableName:"Modul"
});

export default Modul;

