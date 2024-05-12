import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const NilaiWawancara = db.define('NilaiWawancara', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idPesertaWawancara: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    idPewawancara: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    nilai:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    keterangan:{
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    tableName:"NilaiWawancara"
});

export default NilaiWawancara;

