const DB_NAME = 'MovieAppDB';
const DB_VERSION = 1;
const STORE_NAME = 'movies';

export function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            console.error('Database error:', event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'imdbID' });
                store.createIndex('title', 'Title', { unique: false });
            }
        };
    });
}

export async function saveMovie(movie) {
    try {
        const db = await openDatabase();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const request = store.put(movie); // Menyimpan atau update

            request.onsuccess = () => resolve(true);
            request.onerror = (event) => {
                console.error('Save movie error:', event.target.error);
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error('saveMovie failed:', error);
        throw error;
    }
}

export async function getMovie(imdbID) {
    try {
        const db = await openDatabase();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const request = store.get(imdbID);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => reject(event.target.error);
        });
    } catch (error) {
        console.error('getMovie failed:', error);
        throw error;
    }
}

export async function deleteMovie(imdbID) {
    try {
        const db = await openDatabase();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const request = store.delete(imdbID);

            request.onsuccess = () => resolve(true);
            request.onerror = (event) => reject(event.target.error);
        });
    } catch (error) {
        console.error('deleteMovie failed:', error);
        throw error;
    }
}

export async function getAllMovies() {
    try {
        const db = await openDatabase();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
                const results = request.result || [];
                resolve(results);
            };
            request.onerror = (event) => {
                console.error('getAllMovies error:', event.target.error);
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error('getAllMovies failed:', error);
        throw error;
    }
}
