import { Sequelize } from "sequelize";
import db from "../../config/db.config.js";
const { DataTypes } = Sequelize;

const Labor = db.define('Labor',{
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    nama_Labor:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    deskripsi:{
        type: DataTypes.TEXT,
        allowNull: false,
    }
},{
    tableName:"Labor"
});

export default Labor;