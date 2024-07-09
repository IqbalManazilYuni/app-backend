import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const Wawancara = db.define('Wawancara', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idTahapan: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        unique: true,
    },
    nama_wawancara: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // metode_wawancara: {
    //     type: DataTypes.ENUM('Offline','Online'),
    //     allowNull: false,
    // }
    tanggal_terakhir_pengajuan: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    durasi_persesi: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 15
    }
}, {
    tableName: "wawancara"
});

export default Wawancara;

