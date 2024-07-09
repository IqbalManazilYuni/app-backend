import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const PesertaWawancara = db.define('PesertaWawancara', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idWawancara: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    idPendaftar: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        unique: true,
    },
    lokasi: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    metode_wawancara: {
        type: DataTypes.ENUM('Online', 'Offline'),
        allowNull: false,
    },
    status_pengajuan:{
        type: DataTypes.ENUM('Cek','Pengajuan Tidak Diterima','Pengajuan Diterima','Pengajuan','Jadwal Diterima'),
        allowNull: true,
        defaultValue:"Cek",
    },
    asalan_pengajuan:{
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue:""
    },
    jadwal_mulai: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    jadwal_selesai: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: "pesertawawancara"
});

export default PesertaWawancara;

