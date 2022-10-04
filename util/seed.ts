import { sequelize } from './db';
import { Book, User, Author, Shelf, ShelfBook, Review } from '../models';
import { books, users, authors, shelves, shelfBooks, reviews } from './data';

const main = async () => {
  await sequelize.sync({ force: true });
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
  await Promise.all(
    shelves.map(async (shelf) => {
      const { name, userId } = shelf;
      return Shelf.create({ name, userId });
    })
  );
  console.log('Shelves added');
  await Promise.all(
    shelfBooks.map(async (shelfBook) => {
      const { shelfId, bookId } = shelfBook;
      return ShelfBook.create({ shelfId, bookId });
    })
  );
  console.log('Books added to shelves');
  await Promise.all(
    reviews.map(async (shelfBook) => {
      const { rating, content, bookId, userId } = shelfBook;
      return Review.create({ rating, content, bookId, userId });
    })
  );
  console.log('Reviews added');
  sequelize.close();
  process.exit(0);
};

main();
