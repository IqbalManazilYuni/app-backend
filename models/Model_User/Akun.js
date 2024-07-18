import { Sequelize } from "sequelize";
import db from "../../config/db.config.js";

const { DataTypes } = Sequelize;

const Akun = db.define('Akun', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nim: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true,
            customValidator(value) {
                const regex = /^[0-9]+$/;
                if (!regex.test(value)) {
                    throw new Error('NIM Harus Numerik.');
                }
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Perbaiki Penulisan Email Anda"
            },
            customValidator(value) {
                if (!value) {
                    throw new Error("Perbaiki Penulisan Email Anda");
                }
            }
        }
    },
    AksesRole: {
        type: DataTypes.ENUM('User', 'Admin', 'Super Admin'),
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
    kode_verifikasi: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status_akun: {
        type: DataTypes.ENUM('Terverifikasi', 'Tidak Terverifikasi'),
        allowNull: true,
    },
    verifikasiToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: "akun"
});

export default Akun;