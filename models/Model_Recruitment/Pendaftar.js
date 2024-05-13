import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const Pendaftar = db.define('Pendaftar', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    tahun: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM('failed','on progress'),
        allowNull: false,
    },
    idUsers: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    idRecruitment: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    }
},{
    tableName:"Pendaftar"
});

export default Pendaftar;

