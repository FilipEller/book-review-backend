import Book from './book';
import User from './user';
import Author from './author';
import Shelf from './shelf';

Book.sync({ alter: true });
User.sync({ alter: true });
Author.sync({ alter: true });
Shelf.sync({ alter: true });

export { Book, User, Author, Shelf };
