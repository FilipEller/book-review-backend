import Book from './book';
import User from './user';
import Author from './author';
import Shelf from './shelf';
import ShelfBook from './shelfBook';
import Review from './review';

User.hasMany(Shelf);
Shelf.belongsTo(User);

// Book.belongsToMany(Shelf, { through: ShelfBook });
// Shelf.belongsToMany(Book, { through: ShelfBook });
ShelfBook.belongsTo(Book);
ShelfBook.belongsTo(Shelf);

Book.hasMany(Review);
Review.belongsTo(Book);

User.hasMany(Review);
Review.belongsTo(User);

Book.sync();
User.sync();
Author.sync();
Shelf.sync();
ShelfBook.sync();

export { Book, User, Author, Shelf, ShelfBook, Review };
