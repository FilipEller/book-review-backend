const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class Shelf extends Model {}

Shelf.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'shelf',
  }
);

export default Shelf;
