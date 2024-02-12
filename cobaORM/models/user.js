'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo, {
        foreignKey: 'executor'
      })
    }

    static hashPassword(password) {
      return bcrypt.hashSync(password, saltRounds)
    }

    checkPassword(password) {
      return bcrypt.compareSync(password, this.dataValues.password)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (record, options) => {
        record.dataValues.password = User.hashPassword(record.dataValues.password, saltRounds)
      },
    },
    sequelize,
    modelName: 'User',
  }
  );
  return User;
};