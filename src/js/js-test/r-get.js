const BASE_URL = 'http://localhost:3000';

function fetchBooks() {
  return fetch(`${BASE_URL}/books`).then(res => res.json());
}

function fetchBooksById(idBook) {
  return fetch(`${BASE_URL}/books/${idBook}`).then(res => res.json());
}
