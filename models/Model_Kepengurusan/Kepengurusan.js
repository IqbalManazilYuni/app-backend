import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const Kepengurusan = db.define('Kepengurusan', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nama_kepengurusan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tahun: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    generasi_kepengurusan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idLabor: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
},{
    tableName:"Kepengurusan"
});

export default Kepengurusan;

