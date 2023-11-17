// Récupération des éléments html
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');
// variables de la pagination 
const resultsPerPage = 20;
const currentPage = 1;

searchForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const searchTerm = searchInput.value;
      const apiKey = '567b4249e91c8e9687dcee826f222322';

      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                  resultsContainer.innerHTML = '';

                  data.results.slice((currentPage - 1) * resultsPerPage, currentPage *     resultsPerPage).forEach(movie => {
                       
                        // Création des éléments HTML pour afficher les informations du film
                        const movieElement = document.createElement('div');
                        movieElement.classList.add('movie');

                        const movieImage = document.createElement('img');
                        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                        movieImage.alt = movie.title;

                        const movieTitle = document.createElement('h2');
                        movieTitle.textContent = movie.title;

                        const movieDescription = document.createElement('p');
                        movieDescription.textContent = movie.overview;

                        // Ajout des éléments au conteneur des résultats
                        movieElement.appendChild(movieImage);
                        movieElement.appendChild(movieTitle);
                        movieElement.appendChild(movieDescription);
                        resultsContainer.appendChild(movieElement);
                  });

                  
                  const totalPages = Math.ceil(data.results.length / resultsPerPage);

                  const pagination = document.getElementById('pagination');

                  pagination.innerHTML = '';

                  for (let i = 1; i <= totalPages; i++) {
                        const pageButton = document.createElement('button');
                        pageButton.textContent = i;
                        pageButton.addEventListener('click', function () {
                              currentPage = 1;
                         
                        });
                        pagination.appendChild(pageButton);
                  }

            })
            .catch(error => {
                  console.log(error);
            });
});

