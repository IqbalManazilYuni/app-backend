import { Sequelize } from "sequelize";
import db from '../config/db.config.js';

const { DataTypes } = Sequelize

const Users = db.define('User', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [0, 100]
    }
  },
  nim: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  no_lab: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    }
  },
  nomor_hp: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    }
  },
  lab: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  tempat_lahir: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    }
  },
  tanggal_lahir: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    }
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    }
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
    }
  },
})

export default Users;