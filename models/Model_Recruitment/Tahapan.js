import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const Tahapan = db.define('Tahapan', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idRecruitment: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    nama_tahapan:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    jenis_tahapan:{
        type: DataTypes.ENUM('Ujian', 'Wawancara'),
        allowNull: false,
    }
},{
    tableName:"tahapan"
});

export default Tahapan;
