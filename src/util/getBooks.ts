import extBookService from '../services/extBooks';

const main = async () => {
  const books = await extBookService.fetchBooks('harry potter');
  function onlyUnique(value: string, index: number, self: string) {
    return self.indexOf(value) === index;
  }
  const authorData = books
    .flatMap((b: any) => b.authors)
    .filter((a: any) => a)
    .filter(onlyUnique)
    .map((a: any) => ({
      name: a,
    }));
  console.log('Books:', books);
  console.log('Authors:', authorData);
};

main();
