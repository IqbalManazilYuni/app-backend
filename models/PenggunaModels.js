import { Sequelize } from "sequelize";
import db from "../config/db.config.js";

const { DataTypes } = Sequelize;

const Pengguna = db.define('Pengguna', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [0, 100]
        }
    },
    nim: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    nomor_asisten: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    jenisPengguna: {
        type: DataTypes.ENUM('Asisten', 'Calon Asisten'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pendaftar', 'Tahapan1', 'Tahapan2','Gagal','Lulus'),
        allowNull: false,
    },
    idLabor: {
        type: DataTypes.UUID,
        allowNull: true,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    nomor_hp: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
    tempat_lahir: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
    tanggal_lahir: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
    JenisKelamin: {
        type: DataTypes.ENUM('Pria','Wanita'),
        allowNull: false,
    },
    AksesRole: {
        type: DataTypes.ENUM('User','Admin'),
        allowNull: false,
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
    file_path: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
    nama_file: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
},{
    tableName:"Pengguna"
});

export default Pengguna;