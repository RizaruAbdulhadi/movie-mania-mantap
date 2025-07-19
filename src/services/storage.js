const WATCHED_KEY = 'watched_movies';
const WATCHLIST_KEY = 'watchlist_movies';

// Ambil list dari localStorage
const getList = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

// Simpan list ke localStorage
const saveList = (key, list) => {
    localStorage.setItem(key, JSON.stringify(list));
};

// Tambah movie ke list
const addToList = (key, movie) => {
    if (!movie || !movie.imdbID) return;
    const list = getList(key);
    if (!list.some((m) => m.imdbID === movie.imdbID)) {
        list.push(movie);
        saveList(key, list);
    }
};

// Hapus movie dari list (berdasarkan imdbID)
const removeFromList = (key, imdbID) => {
    if (!imdbID) return;
    const list = getList(key).filter((m) => m.imdbID !== imdbID);
    saveList(key, list);
};

// Cek apakah movie sudah ada di list
const isInList = (key, imdbID) => {
    if (!imdbID) return false;
    const list = getList(key);
    return list.some((m) => m.imdbID === imdbID);
};

// ============================
// Export untuk Watchlist
// ============================
export const getWatchList = () => getList(WATCHLIST_KEY);
export const addToWatchList = (movie) => addToList(WATCHLIST_KEY, movie);
export const removeFromWatchList = (imdbID) => removeFromList(WATCHLIST_KEY, imdbID);
export const isListed = (imdbID) => isInList(WATCHLIST_KEY, imdbID);

// ============================
// Export untuk Watched List
// ============================
export const getWatchedList = () => getList(WATCHED_KEY);
export const addToWatchedList = (movie) => addToList(WATCHED_KEY, movie);
export const removeFromWatchedList = (imdbID) => removeFromList(WATCHED_KEY, imdbID);
export const isWatched = (imdbID) => isInList(WATCHED_KEY, imdbID);

// ============================
// Movie Detail Storage (Opsional)
// ============================
export const saveMovieDetails = (movie) => {
    localStorage.setItem('movieDetails', JSON.stringify(movie));
};

export const deleteMovieDetails = () => {
    localStorage.removeItem('movieDetails');
};
