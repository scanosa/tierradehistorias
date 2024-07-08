const baseUrl = 'https://goodreads-books.p.rapidapi.com/search';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'c42af4d715msh8b1dd5262a9423bp1cc6bbjsne4117dfebd1d',
    'x-rapidapi-host': 'goodreads-books.p.rapidapi.com'
  }
};

let books = [];
let searchResults = [];
let currentPage = 1;
let searchPage = 1;
const booksPerPage = 10;
const searchResultsPerPage = 5;

async function fetchBooks() {
  try {
    const response = await fetch('https://goodreads-books.p.rapidapi.com/genres/colouring-books/best', options);
    const result = await response.json();
    books = result.books.map(book => {
      // Limpiar el URL de la imagen
      book.smallImageURL = cleanImageURL(book.smallImageURL);
      return book;
    });
    renderBooks();
    renderPagination();
  } catch (error) {
    console.error(error);
  }
}

function cleanImageURL(url) {
  return url.replace(/(\.[^.]+)\.[^.]+(\.[^.]+$)/, '$1$2');
}

function renderBooks() {
  const bibliotecaGrilla = document.querySelector('.bibliotecaGrilla');
  bibliotecaGrilla.innerHTML = '';

  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const booksToRender = books.slice(startIndex, endIndex);

  booksToRender.forEach(book => {
    const bookHTML = `
      <picture class="libroPortada">
        <a href="${book.url}">
          <img src="${book.smallImageURL}" alt="${book.title}">
        </a>
      </picture>
    `;
    bibliotecaGrilla.innerHTML += bookHTML;
  });
}

function renderPagination() {
  const pagination = document.querySelector('.bibliotecaPaginado');
  pagination.innerHTML = '';

  const totalPages = Math.ceil(books.length / booksPerPage);

  const prevPageHTML = `<a href="#" onclick="changePage(${currentPage - 1})">&#10094;</a>`;
  pagination.innerHTML += currentPage > 1 ? prevPageHTML : '';

  for (let i = 1; i <= totalPages; i++) {
    const pageHTML = `<a href="#" class="${i === currentPage ? 'activePage' : ''}" onclick="changePage(${i})">${i}</a>`;
    pagination.innerHTML += pageHTML;
  }

  const nextPageHTML = `<a href="#" onclick="changePage(${currentPage + 1})">&#10095;</a>`;
  pagination.innerHTML += currentPage < totalPages ? nextPageHTML : '';
}

function changePage(page) {
  if (page < 1 || page > Math.ceil(books.length / booksPerPage)) return;
  currentPage = page;
  renderBooks();
  renderPagination();
}

document.addEventListener('DOMContentLoaded', fetchBooks);

// Nueva funcionalidad de búsqueda
document.getElementById('searchForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const searchTerm = document.getElementById('searchInput').value.trim();
  if (!searchTerm) return;

  const searchUrl = `${baseUrl}?q=${searchTerm}`;

  try {
    const response = await fetch(searchUrl, options);
    const result = await response.json();

    // Verificar si hay resultados y mostrar un mensaje en caso contrario
    if (!result || !result.length) {
      displayNoResults();
      return;
    }

    // Ocultar la sección original
    document.querySelector('.biblioteca').style.display = 'none';

    // Mostrar la sección de resultados de búsqueda
    const resultadosBusqueda = document.querySelector('.resultadosBusqueda');
    resultadosBusqueda.style.display = 'block';

    searchResults = result;

    renderSearchResults();
    renderSearchPagination();
  } catch (error) {
    console.error(error);
  }
});

function renderSearchResults() {
  const resultadosGrilla = document.querySelector('.resultadosGrilla');
  resultadosGrilla.innerHTML = '';

  const startIndex = (searchPage - 1) * searchResultsPerPage;
  const endIndex = startIndex + searchResultsPerPage;
  const resultsToRender = searchResults.slice(startIndex, endIndex);

  resultsToRender.forEach(book => {
    const bookHTML = `
      <div class="libro">
        <a href="${book.url}">
          <img src="${book.smallImageURL}" alt="${book.title}">
        </a>
        <h3>${book.title}</h3>
        <p>Autor: ${book.author}</p
                <p>Rating: ${book.rating}</p>
        <p>Ratings: ${book.ratings}</p>
        <p>Año de publicación: ${book.publicationYear}</p>
      </div>
    `;
    resultadosGrilla.innerHTML += bookHTML;
  });
}

function renderSearchPagination() {
  const pagination = document.querySelector('.resultadosPaginado');
  pagination.innerHTML = '';

  const totalPages = Math.ceil(searchResults.length / searchResultsPerPage);

  const prevPageHTML = `<a href="#" onclick="changeSearchPage(${searchPage - 1})">&#10094;</a>`;
  pagination.innerHTML += searchPage > 1 ? prevPageHTML : '';

  for (let i = 1; i <= totalPages; i++) {
    const pageHTML = `<a href="#" class="${i === searchPage ? 'activePage' : ''}" onclick="changeSearchPage(${i})">${i}</a>`;
    pagination.innerHTML += pageHTML;
  }

  const nextPageHTML = `<a href="#" onclick="changeSearchPage(${searchPage + 1})">&#10095;</a>`;
  pagination.innerHTML += searchPage < totalPages ? nextPageHTML : '';
}

function changeSearchPage(page) {
  if (page < 1 || page > Math.ceil(searchResults.length / searchResultsPerPage)) return;
  searchPage = page;
  renderSearchResults();
  renderSearchPagination();
}

function clearSearch() {
  // Restaurar la vista original de la biblioteca
  document.querySelector('.biblioteca').style.display = 'block';
  document.querySelector('.resultadosBusqueda').style.display = 'none';
  document.getElementById('searchInput').value = '';
  searchResults = [];
  searchPage = 1;
  currentPage = 1;
  fetchBooks();
}

// Evento para el botón de limpiar búsqueda
document.getElementById('clearSearchButton').addEventListener('click', clearSearch);

function displayNoResults() {
  const resultadosGrilla = document.querySelector('.resultadosGrilla');
  resultadosGrilla.innerHTML = '<p>No se encontraron resultados para su búsqueda.</p>';
}

