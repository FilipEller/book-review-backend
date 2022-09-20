import fetchBooks from './fetchBooks';

const main = async () => {
  const books = await fetchBooks('harry potter');
  const bookData = books.map((b: any) => {
    const { id, volumeInfo } = b;
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
  });
  function onlyUnique(value: string, index: number, self: string) {
    return self.indexOf(value) === index;
  }
  const authorData = books
    .flatMap((b: any) => b.volumeInfo.authors)
    .filter((a: any) => a)
    .filter(onlyUnique)
    .map((a: any) => ({
      name: a,
    }));
  console.log('Books:', bookData);
  console.log('Authors:', authorData);
};

main();
