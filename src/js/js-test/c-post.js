const BASE_URL = 'http://localhost:3000';

const newBook = {
  title: 'Test - 2',
  author: 'Nazarii Lozynskyi',
  genres: ['css'],
  rating: 9,
};

function addBook(book) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  };

  return fetch(`${BASE_URL}/books`, options).then(res => res.json());
}

addBook(/*newBook*/)
  .then(renderBook)
  .catch(error => console.log(error));
