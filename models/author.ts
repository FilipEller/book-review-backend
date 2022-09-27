import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../util/db';

class Author extends Model {}

Author.init(
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
    timestamps: true,
    modelName: 'author',
  }
);

// Possible future properties: books, bornDate, bornPlace, died, genres, quotes, description, influences

export default Author;
