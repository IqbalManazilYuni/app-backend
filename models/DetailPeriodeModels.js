import { Sequelize } from "sequelize";
import db from '../config/db.config.js';
import Labor from "./LaborModels.js";
import Jabatan from "./JabatanModels.js";
import Periode from "./PeriodeModels.js";

const { DataTypes } = Sequelize;

const DetailPeriode = db.define('DetailPeriode', {
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
    idPeriode: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    idJabatan: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
},{
    tableName:"Detail_Periode"
});

export default DetailPeriode;

