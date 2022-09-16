import { sequelize } from './db';
import { Book } from '../models';
import { books } from './data';

const main = async () => {
  await sequelize.sync();
  await Promise.all(
    books.map(async (b) => {
      const {
        id,
        title,
        description,
        language,
        publishedDate,
        pageCount,
        thumbnail,
        smallThumbnail,
      } = b;
      return Book.create({
        id: id || String(Math.floor(Math.random() * 10000) + 1),
        title: title || 'title',
        description: description || 'description',
        language: language || 'en',
        publishedDate: publishedDate || '01-01-2020',
        pageCount: pageCount || 300,
        thumbnail:
          thumbnail ||
          'https://upload.wikimedia.org/wikipedia/commons/5/56/Divine_Comedy_translated_by_Minaev.jpg',
        smallThumbnail:
          smallThumbnail ||
          'https://upload.wikimedia.org/wikipedia/commons/5/56/Divine_Comedy_translated_by_Minaev.jpg',
      });
    })
  );
  console.log('books added');
};

main();
