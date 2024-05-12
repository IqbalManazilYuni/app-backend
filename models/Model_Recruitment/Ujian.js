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
    idTahapan: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
        unique: true,
    },

},{
    tableName:"Ujian"
});

export default Ujian;

