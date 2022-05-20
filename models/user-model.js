const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'user',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    activationLink: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
