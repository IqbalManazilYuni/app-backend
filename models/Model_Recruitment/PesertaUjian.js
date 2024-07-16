import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const PesertaUjian = db.define('PesertaUjian', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idPendaftar: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        unique: true,
    },
    idUsers: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    idUjian: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    status_pengajuan: {
        type: DataTypes.ENUM('Cek', 'Pengajuan Tidak Diterima', 'Pengajuan Diterima', 'Pengajuan', 'Jadwal Diterima'),
        allowNull: true,
        defaultValue: "Cek",
    },
    asalan_pengajuan: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ""
    },
    nilaiUjian: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    }
}, {
    tableName: "pesertaujian"
});

export default PesertaUjian;

