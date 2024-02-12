'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User, {foreignKey: 'executor'})
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
    executor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};