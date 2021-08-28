export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const API_KEY = '22982376-5ba816c8dbdcbd488bfab475d';
    const PER_PAGE = 12;
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&per_page=${PER_PAGE}&page=${this.page}&key=${API_KEY}`;

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.incrementPage();

        //console.log(data.hits);
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
