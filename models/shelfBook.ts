import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../util/db';

class ShelfBook extends Model {}

ShelfBook.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shelfId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'shelves', key: 'id' },
    },
    bookId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: 'books', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'shelf_book',
  }
);

export default ShelfBook;
