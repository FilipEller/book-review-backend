import Book from './book';
import User from './user';
import Author from './author';

Book.sync();
User.sync();
Author.sync();

export { Book, User, Author };
