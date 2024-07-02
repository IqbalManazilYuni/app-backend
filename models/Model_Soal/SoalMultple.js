import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const SoalMultiple = db.define('SoalMultiple', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idBankSoal: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    soal:{
        type: DataTypes.TEXT('long'),
        allowNull:false,
    },
    pilihan1:{
        type: DataTypes.TEXT,
        allowNull:false,
    },
    pilihan2:{
        type: DataTypes.TEXT,
        allowNull:false,
    },
    pilihan3:{
        type: DataTypes.TEXT,
        allowNull:false,
    },
    pilihan4:{
        type: DataTypes.TEXT,
        allowNull:false,
    },
    kunci:{
        type: DataTypes.TEXT,
        allowNull:false,
    }

},{
    tableName:"soalmultiple"
});

export default SoalMultiple;

