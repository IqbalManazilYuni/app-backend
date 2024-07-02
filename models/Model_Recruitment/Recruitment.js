import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const Recruitment = db.define('Recruitment', {
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
        onUpdate: 'CASCADE'
    },
    idKegiatan: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    nama_recruitment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    limit_peserta: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tanggal_buka: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    tanggal_tutup: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Open', 'Close'),
        defaultValue: 'Close',
        allowNull: false,
    }
}, {
    tableName: "recruitment"
});

export default Recruitment;

