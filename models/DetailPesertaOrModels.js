import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import ProsesOr from "./ProsesOrModule.js";
import Pengguna from "./PenggunaModels.js";

const { DataTypes } = Sequelize;

const DetailPesertaOr = db.define('DetailPesertaOr', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idProsesOr: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    idPengguna:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    }

},{
    tableName:"DetailPesertaOr"
});

export default DetailPesertaOr;

