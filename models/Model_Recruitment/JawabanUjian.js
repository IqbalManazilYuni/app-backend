import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const JawabanUjian = db.define('JawabanUjian', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idPesertaUjian: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    idSoalUjian: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    Jawaban: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipe_soal: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nilai: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "jawabanujian"
});

export default JawabanUjian;

