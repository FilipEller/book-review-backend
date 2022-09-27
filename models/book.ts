import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../util/db';

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishedDate: {
      type: DataTypes.DATE,
    },
    pageCount: {
      type: DataTypes.INTEGER,
    },
    thumbnail: {
      type: DataTypes.TEXT,
    },
    smallThumbnail: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'book',
  }
);

// authors: [String!]!
// categories: [String]!

export default Book;
