const sequelize = require('../config/db');
const { DataTypes, Sequelize } = require('sequelize');
const User = require('./user-model');

const Token = sequelize.define(
  'Token',
  {
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Token;
