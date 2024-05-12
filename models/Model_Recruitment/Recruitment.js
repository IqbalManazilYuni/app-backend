import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const Recruitment = db.define('Recruitment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idKepengurusan: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    nama_recruitment:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    limit_peserta:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status:{
        type: DataTypes.ENUM('Open','Close'),
        defaultValue:'Open',
        allowNull: false,
    }
},{
    tableName:"Recruitment"
});

export default Recruitment;
