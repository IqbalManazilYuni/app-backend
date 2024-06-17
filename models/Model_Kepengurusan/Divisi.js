import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const Divisi = db.define('Divisi', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idLabor: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    nama_divisi: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
    },
    deskripsi: {
        type: DataTypes.TEXT("long"),
        allowNull: true,
    },
}, {
    tableName: "Divisi"
});

export default Divisi;

