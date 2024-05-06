import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import Tahapan from "./TahapanModels.js";
import Pengguna from "./PenggunaModels.js";

const { DataTypes } = Sequelize;

const Wawancara = db.define('Wawancara', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idTahapan: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    lokasi:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    jadwal:{
        type: DataTypes.DATE,
        allowNull: false,
    }
},{
    tableName:"Wawancara"
});

export default Wawancara;

