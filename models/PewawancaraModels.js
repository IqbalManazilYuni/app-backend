import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import Wawancara from "./WawancaraModels.js";

const { DataTypes } = Sequelize;

const Pewawancara = db.define('Pewawancara', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nama_pewawancara: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idWawancara: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },

},{
    tableName:"Pewawancara"
});

export default Pewawancara;

