import Chance from "chance";

const chance = new Chance();

/** 
    @param num {Number}
*/

// a function for generating number of fake books
function generateFakeBooks(num) {
  const booksList = [];

  for (let i = 0; i < num; i++) {
    booksList.push({
      book_name: chance.sentence(3),
      book_author: chance.name(),
      book_category: chance.word(),
      realase_year: chance.date(),
    });
  }

  return booksList;
}

export { generateFakeBooks };
