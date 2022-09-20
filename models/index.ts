import Book from './book';
import User from './user';
import Author from './author';
import Shelf from './shelf';
import ShelfBook from './shelfBook';

// User.hasMany(Shelf);
// Shelf.belongsTo(User);

// Book.belongsToMany(Shelf, { through: ShelfBook });
// Shelf.belongsToMany(Book, { through: ShelfBook });

Book.sync({ force: true });
User.sync({ force: true });
Author.sync({ force: true });
Shelf.sync({ force: true });
ShelfBook.sync({ force: true });

export { Book, User, Author, Shelf, ShelfBook };
