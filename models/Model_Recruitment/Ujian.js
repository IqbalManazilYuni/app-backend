import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const Ujian = db.define('Ujian', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    status: {
        type: DataTypes.ENUM('Open','Close'),
        defaultValue:"Open",
        allowNull: false,
    },
    jadwal_mulai:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    jadwal_selesai:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    nama_ujian:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    kode_ujian:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_terakhir_pengajuan: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    idTahapan: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
        unique: true,
    },

},{
    tableName:"ujian"
});

export default Ujian;

