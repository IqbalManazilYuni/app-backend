import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const RiwayatPembaca = db.define('RiwayatPembaca', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idUsers: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    idModul: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    tanggal_baca: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    durasi_baca: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "RiwayatPembaca"
});

export default RiwayatPembaca;

