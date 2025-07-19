import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import {
    addToWatchList,
    removeFromWatchList,
    addToWatchedList,
    removeFromWatchedList,
    isWatched,
    isListed
} from '../services/storage';
import './MovieDetailModal.css';

const MovieDetailModal = ({ movie, show, onClose, onUpdateSidebar }) => {
    const [inWatchList, setInWatchList] = useState(false);
    const [alreadyWatched, setAlreadyWatched] = useState(false);
    const [comment, setComment] = useState('');
    const [userRating, setUserRating] = useState(0);

    useEffect(() => {
        if (movie && movie.imdbID) {
            setInWatchList(isListed(movie.imdbID));
            setAlreadyWatched(isWatched(movie.imdbID));

            const savedFeedback = JSON.parse(localStorage.getItem(`movie_${movie.imdbID}_feedback`));
            if (savedFeedback) {
                setComment(savedFeedback.comment || '');
                setUserRating(savedFeedback.rating || 0);
            } else {
                setComment('');
                setUserRating(0);
            }
        }
    }, [movie]);

    const handleWatchListToggle = () => {
        if (!movie) return;
        inWatchList ? removeFromWatchList(movie.imdbID) : addToWatchList(movie);
        setInWatchList(!inWatchList);
    };

    const handleWatchedToggle = () => {
        if (!movie) return;
        alreadyWatched ? removeFromWatchedList(movie.imdbID) : addToWatchedList(movie);
        setAlreadyWatched(!alreadyWatched);
    };

    const handleSaveFeedback = () => {
        if (!movie?.imdbID) return;
        localStorage.setItem(
            `movie_${movie.imdbID}_feedback`,
            JSON.stringify({ comment, rating: userRating })
        );
        alert('Feedback saved!');
    };

    const handleClose = () => {
        onClose?.();
        onUpdateSidebar?.();
    };

    const posterUrl = movie?.Poster && movie.Poster !== 'N/A'
        ? movie.Poster
        : 'https://via.placeholder.com/500x750?text=No+Image';

    const renderStars = (rating) => {
        const stars = [];
        const starRating = Math.round((rating / 10) * 5);
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`star ${i <= starRating ? 'filled' : ''}`}>★</span>
            );
        }
        return stars;
    };

    if (!movie || Object.keys(movie).length === 0) return null;

    return (
        <Modal show={show} onHide={handleClose} centered fullscreen="md-down">
            <Modal.Header closeButton>
                <Modal.Title>{movie.Title || 'Movie Details'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="modal-content-scrollable">
                    <img
                        src={posterUrl}
                        alt={movie.Title || 'Movie Poster'}
                        className="img-fluid mb-3 w-100"
                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />

                    <p><strong>Release Date:</strong> {movie.Released || 'N/A'}</p>

                    <div className="rating mb-3">
                        {renderStars(parseFloat(movie.imdbRating))}
                        <span className="numeric-rating">({movie.imdbRating || 'N/A'})</span>
                    </div>

                    <p>{movie.Plot && movie.Plot !== 'N/A' ? movie.Plot : 'No overview available.'}</p>

                    {/* Responsive Buttons */}
                    <div className="row mt-4">
                        <div className="col-12 col-md-6 mb-2">
                            <Button
                                variant={inWatchList ? 'secondary' : 'primary'}
                                onClick={handleWatchListToggle}
                                className="w-100"
                            >
                                {inWatchList ? 'Listed' : 'Add to Watchlist'}
                            </Button>
                        </div>

                        <div className="col-12 col-md-6">
                            <Button
                                variant={alreadyWatched ? 'success' : 'outline-success'}
                                onClick={handleWatchedToggle}
                                className="w-100"
                            >
                                {alreadyWatched ? 'Watched' : 'Watch'}
                            </Button>
                        </div>
                    </div>

                    {/* Feedback Section */}
                    <div className="user-feedback mt-5 pt-3 border-top">
                        <h5 className="mb-3">Your Feedback</h5>

                        <div className="rating-stars mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setUserRating(star)}
                                    style={{
                                        cursor: 'pointer',
                                        color: userRating >= star ? '#f5c518' : '#ccc',
                                        fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                                        marginRight: 4
                                    }}
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                        <Form.Group>
                            <Form.Label>Your Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end mt-3">
                            <Button variant="info" onClick={handleSaveFeedback}>
                                💾 Save Feedback
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

MovieDetailModal.propTypes = {
    movie: PropTypes.object,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdateSidebar: PropTypes.func
};

export default MovieDetailModal;
