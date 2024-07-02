import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const Pendaftar = db.define('Pendaftar', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    tanggal_daftar: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    idKegiatan: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    idUsers: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    Status_Pendaftar: {
        type: DataTypes.ENUM('OnProgress', 'Lulus', 'Gagal'),
        defaultValue: "OnProgress",
        allowNull: false,
    },
    verifikasi_berkas: {
        type: DataTypes.ENUM('OnSubmit', 'Terverifikasi', 'Tidak Terverifikasi'),
        defaultValue: "OnSubmit",
        allowNull: false,
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    file_krs: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    file_permohonan: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    alasan: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    idRecruitment: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: "Pendaftar"
});

export default Pendaftar;

