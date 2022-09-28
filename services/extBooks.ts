import axios from 'axios';
import urlencode from 'urlencode';

const extractBookData = (book: any) => {
  console.log(book)
  const { id, volumeInfo } = book;
  const {
    title,
    authors,
    publishedDate,
    description,
    // industryIdentifiers,
    pageCount,
    categories,
    imageLinks,
    language,
  } = volumeInfo;
  return {
    id,
    title,
    description,
    authors: authors || [],
    language,
    publishedDate,
    categories: categories || [],
    pageCount,
    thumbnail: imageLinks?.thumbnail,
    smallThumbnail: imageLinks?.smallThumbnail,
  };
};

const fetchBook = async (volumeId: string) => {
  console.log('fetching', volumeId);
  const result = await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${urlencode(volumeId)}`
  );
  return extractBookData(result.data);
};

const fetchBooks = async (query: string) => {
  console.log('fetching', query);
  const result = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${urlencode(
      query
    )}&maxResults=20`
  );
  return result.data.items.map(extractBookData);
};

export default { extractBookData, fetchBook, fetchBooks };
