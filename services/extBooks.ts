import axios from 'axios';
import urlencode from 'urlencode';
import getErrorMessage from '../util/getErrorMessage';

const extractBookData = (book: any) => {
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
  // console.log('fetching', volumeId);
  try {
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${urlencode(volumeId)}`
    );
    // console.log({ result });
    return extractBookData(result.data);
  } catch (e: unknown) {
    throw new Error(
      'Error fetching external data: ' + getErrorMessage(e)
    );
  }
};

const fetchBooks = async (query: string) => {
  // console.log('fetching', query);
  try {
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${urlencode(
        query
      )}&maxResults=20`
    );
    return result.data.items.map(extractBookData);
  } catch (e: unknown) {
    throw new Error(
      'Error fetching external data: ' + getErrorMessage(e)
    );
  }
};

export default { extractBookData, fetchBook, fetchBooks };
