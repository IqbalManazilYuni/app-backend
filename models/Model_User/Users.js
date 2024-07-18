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
    idAkun: {
        type: DataTypes.UUID,
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    idLabor: {
        type: DataTypes.UUID,
        allowNull: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    nomor_asisten: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    angkatan: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    jenisPengguna: {
        type: DataTypes.ENUM('Asisten', 'Calon Asisten', 'Ex-Asisten'),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('Pendaftar', 'Tahapan1', 'Tahapan2', 'Gagal', 'Lulus'),
        allowNull: true,
        defaultValue: 'Pendaftar',
    },
    nama_file: {
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
        allowNull: true,
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: "mahasiswa"
});

export default User;