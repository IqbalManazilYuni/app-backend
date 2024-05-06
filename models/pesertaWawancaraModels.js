import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import Pengguna from "./PenggunaModels.js";
import Wawancara from "./WawancaraModels.js";

const { DataTypes } = Sequelize;

const PesertaWawancara = db.define('PesertaWawancara', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idPengguna: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    idWawancara: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    sesi:{
        type: DataTypes.DATE,
        allowNull: false,
    }
},{
    tableName:"PesertaWawancara"
});

export default PesertaWawancara;

