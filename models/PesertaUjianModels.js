import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import Ujian from "./Ujian.js";
import Pengguna from "./PenggunaModels.js";

const { DataTypes } = Sequelize;

const PesertaUjian = db.define('PesertaUjian', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nilai_ujian: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idUjian: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    idPengguna: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
},{
    tableName:"PesertaUjian"
});

export default PesertaUjian;

