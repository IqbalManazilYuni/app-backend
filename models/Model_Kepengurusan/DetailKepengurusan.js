import { Sequelize } from "sequelize";
import db from '../../config/db.config.js';

const { DataTypes } = Sequelize;

const DetailKepengurusan = db.define('DetailKepengurusan', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    idKepengurusan: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    idUsers: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    idDivisi: {
        type: DataTypes.UUID,
        allowNull: true,
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    jabatan: {
        type: DataTypes.ENUM('Kepala Divisi','Anggota','Sekretaris','Bendahara','Koordinator Asisten'),
        allowNull: false,
    }
},{
    tableName:"detailkepengurusan"
});

export default DetailKepengurusan;

