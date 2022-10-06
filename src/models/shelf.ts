import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../db';

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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'shelf',
  }
);

export default Shelf;
