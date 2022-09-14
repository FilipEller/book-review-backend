import axios from 'axios';
import urlencode from 'urlencode';

const fetchBooks = async (query: any) => {
  console.log('fetching', query);
  const result = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${urlencode(
      query
    )}&maxResults=20`
  );
  return result.data.items;
};

export default fetchBooks;
