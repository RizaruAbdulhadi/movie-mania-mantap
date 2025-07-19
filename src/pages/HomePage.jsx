import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import MovieDetailModal from '../components/MovieDetailModal';
import {
    saveMovie,
    getAllMovies,
    deleteMovie
} from '../services/indexedDB';
import {
    addToWatchList,
    addToWatchedList,
    getWatchList,
    getWatchedList
} from '../services/storage';
import './SidebarList.css';

const API_KEY = 'bd1056a1';

const HomePage = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [watchList, setWatchList] = useState([]);
    const [watchedList, setWatchedList] = useState([]);
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState(new Date().getFullYear().toString());
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [sidebarRefreshToggle, setSidebarRefreshToggle] = useState(false);

    const refreshSidebar = () => {
        setWatchList(getWatchList());
        setWatchedList(getWatchedList());
    };

    useEffect(() => {
        refreshSidebar(); // Initial load
    }, []);

    useEffect(() => {
        setWatchList(getWatchList());
        setWatchedList(getWatchedList());
    }, [sidebarRefreshToggle]);

    useEffect(() => {
        fetchMovies(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        const checkActualOnlineStatus = async () => {
            try {
                const res = await fetch("https://www.omdbapi.com/?apikey=bd1056a1&s=test");
                if (!res.ok) throw new Error("Network fail");
                setIsOnline(true);
            } catch {
                setIsOnline(false);
            }
        };

        checkActualOnlineStatus();

        const handleOnline = async () => {
            await checkActualOnlineStatus();
            if (navigator.onLine) {
                console.log('🔄 Online: sinkronisasi data dari IndexedDB...');
                await syncOfflineChanges();
            }
        };

        const handleOffline = () => {
            setIsOnline(false);
            console.log('📴 Offline mode: perubahan akan disimpan di IndexedDB');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);


    const syncOfflineChanges = async () => {
        const offlineMovies = await getAllMovies();
        for (const movie of offlineMovies) {
            if (movie._offlineAction === 'watchlist') {
                addToWatchList(movie);
            } else if (movie._offlineAction === 'watched') {
                addToWatchedList(movie);
            }
            await deleteMovie(movie.imdbID);
        }
        refreshSidebar();
    };

    const fetchMovies = async (title) => {
        try {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`);
            const data = await res.json();

            if (data.Search) {
                const detailedMovies = await Promise.all(
                    data.Search.slice(0, 10).map(async (movie) => {
                        const resDetail = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
                        return await resDetail.json();
                    })
                );
                setMovies(detailedMovies);
            } else {
                setMovies([]);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedMovie(null);
        setShowModal(false);
        refreshSidebar(); // Refresh sidebar ketika modal ditutup
    };

    const handleAddToWatchList = async (movie) => {
        if (isOnline) {
            addToWatchList(movie);
            refreshSidebar();
        } else {
            await saveMovie({ ...movie, _offlineAction: 'watchlist' });
            alert('📥 Ditambahkan ke Watchlist (offline mode)');
        }
    };

    const handleAddToWatchedList = async (movie) => {
        if (isOnline) {
            addToWatchedList(movie);
            refreshSidebar();
        } else {
            await saveMovie({ ...movie, _offlineAction: 'watched' });
            alert('📥 Ditandai sebagai Watched (offline mode)');
        }
    };

    return (

        <div className="homepage-wrapper" >

            <div className="content-container" >
                {/* Main Content */}

                <div className="main-content" >

                    <h1 className="page-title">🎬 Movie Mania Mantap </h1>

                    <SearchBar onSearch={handleSearch} />

                    <div className="movies-grid">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.imdbID}
                                movie={movie}
                                onClick={() => openModal(movie)}
                                onAddToWatchList={() => handleAddToWatchList(movie)}
                                onAddToWatchedList={() => handleAddToWatchedList(movie)}
                            />
                        ))}
                    </div>

                    {showModal && selectedMovie && (
                        <MovieDetailModal
                            movie={selectedMovie}
                            show={showModal}
                            onClose={closeModal}
                            onUpdateSidebar={refreshSidebar}
                        />
                    )}
                </div>

                {/* Sidebar */}
                <div className="sidebar-container">
                    <p className="network-status">
                        Status: {isOnline ? <span className="online">🟢 Online</span> : <span className="offline">🔴 Offline</span>}
                    </p>
                    <div className="sidebar-section">
                        <h3>📌 Watchlist</h3>
                        {watchList.length > 0 ? (
                            <ul>
                                {watchList.map((movie) => (
                                    <li key={movie.imdbID} onClick={() => openModal(movie)} style={{ cursor: 'pointer' }}>
                                        {movie.Title} <span className="year">({movie.Year})</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="empty-list">Belum ada film</p>
                        )}
                    </div>

                    <div className="sidebar-section">
                        <h3>✅ Watched List</h3>
                        {watchedList.length > 0 ? (
                            <ul>
                                {watchedList.map((movie) => (
                                    <li key={movie.imdbID} onClick={() => openModal(movie)} style={{ cursor: 'pointer' }}>
                                        {movie.Title} <span className="year">({movie.Year})</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="empty-list">Belum ada film</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
