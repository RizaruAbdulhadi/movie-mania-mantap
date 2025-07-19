import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';
import { addToWatchList, addToWatchedList, removeFromWatchList, removeFromWatchedList, isListed , isWatched } from '../services/storage';
import { Button, Container, Row, Col, Badge, Image } from 'react-bootstrap';

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [listed, setListed] = useState(false);
    const [watched, setWatched] = useState(false);

    useEffect(() => {
        const getMovie = async () => {
            const data = await fetchMovieDetails(id);
            setMovie(data);
            setListed(isListed (data.id));
            setWatched(isWatched(data.id));
        };
        getMovie();
    }, [id]);

    const toggleWatchList = () => {
        if (listed) {
            removeFromWatchList(movie.id);
        } else {
            addToWatchList(movie);
        }
        setListed(!listed);
    };

    const toggleWatched = () => {
        if (watched) {
            removeFromWatchedList(movie.id);
        } else {
            addToWatchedList(movie);
        }
        setWatched(!watched);
    };

    if (!movie) return <p>Loading...</p>;

    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                    <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} fluid />
                </Col>
                <Col md={8}>
                    <h2>{movie.title} <Badge bg="warning">{movie.vote_average?.toFixed(1)}</Badge></h2>
                    <p><strong>Release:</strong> {movie.release_date}</p>
                    <p>{movie.overview}</p>

                    <div className="d-flex gap-3 mt-3">
                        <Button variant={watched ? "success" : "outline-success"} onClick={toggleWatched}>
                            {watched ? "Watched" : "Watch"}
                        </Button>
                        <Button variant={listed ? "success" : "outline-primary"} onClick={toggleWatchList}>
                            {listed ? "Listed" : "Add List"}
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default MovieDetail;
