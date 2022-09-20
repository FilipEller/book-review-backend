import { sequelize } from './db';
import { Book, User, Author } from '../models';
import { books, users, authors } from './data';

const main = async () => {
  await sequelize.sync();
  Book.destroy({ where: {}, truncate: true });
  User.destroy({ where: {}, truncate: true });
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
  console.log('Books added');
  await Promise.all(
    users.map(async (user) => {
      const { username, name, email } = user;
      return User.create({ username, name, email });
    })
  );
  console.log('Users added');
  await Promise.all(
    authors.map(async (author) => {
      const { name } = author;
      return Author.create({ name });
    })
  );
  console.log('Authors added');
  sequelize.close();
  process.exit(0);
};

main();
