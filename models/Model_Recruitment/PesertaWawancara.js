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
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    idPendaftar: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    lokasi:{
        type: DataTypes.TEXT,
        allowNull:false,
    },
    jadwal_mulai:{
        type: DataTypes.DATE,
        allowNull:false,
    },
    jadwal_selesai:{
        type: DataTypes.DATE,
        allowNull:false,
    },
},{
    tableName:"PesertaWawancara"
});

export default PesertaWawancara;

