import React from 'react';
import './MovieCard.css';


const MovieCard = ({ movie, onClick }) => {
    return (
        <div className="movie-card" onClick={onClick} style={{ cursor: 'pointer' }}>
            <img src={movie.Poster} alt={movie.Title} />
            <div className="movie-title">{movie.Title}</div>
            <div className="movie-meta">
                <span>{movie.Year}</span>  <span>⭐ {movie.imdbRating || movie.imdbRating === 'N/A' ? movie.imdbRating : '–'}</span>

            </div>
        </div>
    );
};

export default MovieCard;
