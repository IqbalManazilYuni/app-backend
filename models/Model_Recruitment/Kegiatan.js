import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const Kegiatan = db.define('Kegiatan', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nama_kegiatan:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    tahun:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    status:{
        type: DataTypes.ENUM('Open','Close'),
        defaultValue:'Open',
        allowNull: false,
    }
},{
    tableName:"kegiatan"
});

export default Kegiatan;

