import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import PesertaWawancara from "./pesertaWawancaraModels.js";
import Pewawancara from "./PewawancaraModels.js";

const { DataTypes } = Sequelize;

const NilaiPesertaWawancara = db.define('NilaiPesertaWawancara', {
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
    }

},{
    tableName:"NilaiPesertaWawancara"
});

export default NilaiPesertaWawancara;

