import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const BankSoal = db.define('BankSoal', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idLabor: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    tipe_soal: {
        type: DataTypes.ENUM('Essay','Multiple'),
        allowNull: false,
    },
    tahun:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    tableName:"BankSoal"
});

export default BankSoal;

