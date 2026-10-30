
import { useState, useEffect } from 'react'
import './MovieBox.css'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjViZDQwNmQzMzc3OWRkMzFlMmE4ZjcwMmJjNmJkNyIsIm5iZiI6MTc5MDQ2MDc2OC4zOTYsInN1YiI6IjZhYjg0MzYwZmJiNzNmZWE5ZDJlOWMyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mUMYXaigILsDHNiE5k3JYqoLrgrwcke7SklfAe-VeF0'
  }
};
const noFoundImage = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'
function MovieBox() {

    const [movies, setMovies] = useState([]);
    const[currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const[sorting, setSorting] = useState('popularity.desc');
    const[searchBox, setSearchBox] = useState('');
    
    useEffect(() => {
        const mainURL = 
        searchBox === '' ?
        `https://api.themoviedb.org/3/discover/movie?sort_by=${sorting}&page=${currentPage}` :
        `https://api.themoviedb.org/3/search/movie?query=${searchBox}&page=${currentPage}`;

    fetch(mainURL, options)
    .then(res => res.json())
    .then (data => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));

        
    }, [sorting, currentPage, searchBox]);


    function handleSortingChange(event) {
        setSorting(event.target.value);
        setCurrentPage(1);
    }

    function handleSearchChange(event) {
        setSearchBox(event.target.value);
        setCurrentPage(1);
    }

  return (
    <div className="MocieBox">
      <input type="text" placeholder="Search for a movie..." value={searchBox} onChange={handleSearchChange} />
         <select id="SortBy" value={sorting} onChange={handleSortingChange}>
    <option value="popularity.desc">Sort By</option>
    <option value="release_date.asc">Release Date (Asc)</option>
    <option value="release_date.desc">Release Date (Desc)</option>
    <option value="vote_average.asc">Rating (Asc)</option>
    <option value="vote_average.desc">Rating (Desc)</option>
  </select>

    <div id = "movies" className="movieCard"> 
        {movies.map((movie) => (

            <div key={movie.id} className="movieCard">
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} onError={(error) => {
                    error.target.src = noFoundImage;
                }} />
                <div className="movieInfo">
                    <strong>{movie.title}</strong>
                    <br /> Release date: {movie.release_date}<br />
                    <p>Rating: {movie.vote_average}</p>
                </div>
            </div>
        ))}
    </div>
    <div class="pagesPart">
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= totalPages }>Next</button>
        <p>Page {currentPage} of {totalPages}</p>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
    </div>
     </div>
  );

}

export default MovieBox