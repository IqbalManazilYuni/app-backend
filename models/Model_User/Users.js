import { Sequelize } from "sequelize";
import db from "../../config/db.config.js";

const { DataTypes } = Sequelize;

const User = db.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idLabor: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    nim: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nomor_asisten: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    jenisPengguna: {
        type: DataTypes.ENUM('Asisten', 'Calon Asisten', 'Ex-Asisten'),
        allowNull: false,
    },
    AksesRole: {
        type: DataTypes.ENUM('User', 'Admin'),
        allowNull: false,
        defaultValue: 'User'
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pendaftar', 'Tahapan1', 'Tahapan2', 'Gagal', 'Lulus'),
        allowNull: false,
        defaultValue: 'Pendaftar',
    },
    nama_file: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    file_path: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    nomor_hp: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tempat_lahir: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tanggal_lahir: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    JenisKelamin: {
        type: DataTypes.ENUM('Pria', 'Wanita'),
        allowNull: false,
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    kode_verifikasi: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "User"
});

export default User;