const API_KEY = "bd1056a1";
const BASE_URL = "https://www.omdbapi.com/";


export async function fetchMovieDetails(imdbID) {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
    const data = await res.json();

    if (data.Response === "True") {
        return data;
    } else {
        throw new Error(data.Error || "Gagal mengambil detail film");
    }
}


export async function fetchMovies(year) {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=movie&y=${year}&type=movie`);
    const data = await res.json();

    if (data.Response === "True") {
        const topTen = data.Search.slice(0, 10);

        const detailedMovies = await Promise.all(
            topTen.map(async (movie) => {
                const detail = await fetchMovieDetails(movie.imdbID);
                return {
                    ...movie,
                    imdbRating: detail.imdbRating || "N/A",
                    Plot: detail.Plot || "",
                    Genre: detail.Genre || "",
                    Year: detail.Year || "",
                };
            })
        );

        return detailedMovies;
    } else {
        throw new Error(data.Error || "Gagal mengambil data film");
    }
}
