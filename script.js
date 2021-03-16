const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=89f1d82110ad9816f326afd831beed14&page=1';
const img_path = 'https://image.tmdb.org/t/p/w1280';
const search_url = 'https://api.themoviedb.org/3/search/movie?&api_key=89f1d82110ad9816f326afd831beed14&page=1&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

//Get Movies function
getMovies = async(url) => {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}
function showMovies(movies){
  main.innerHTML = '';
  movies.forEach((movie) => {
    ///using destrcuturing below to get properties from the fetch data 
    const{title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <img
      src="${img_path + poster_path}"
      alt="${title}">
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
      <h3>${overview}</h3>
    </div>`
  main.appendChild(movieEl);
  });
}
function getClassByRate(vote){
  if (vote >= 8){
    return 'green'
  }else if(vote >= 5){
    return 'orange'
  }else{
    return 'red'
  }
}
getMovies(api_url);

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const searchTerm = search.value;
  if(searchTerm && searchTerm !==''){
    getMovies(search_url + searchTerm);
    search.value = '';
  }else{
    window.location.reload();
  }

})