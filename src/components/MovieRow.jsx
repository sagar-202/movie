import { useState, useEffect, useRef, useCallback } from 'react';
import { getMoviesByKeyword } from '../services/omdb';
import MovieCard from './MovieCard';
import SkeletonLoader from './SkeletonLoader';
import ErrorFallback from './ErrorFallback';

const MovieRow = ({ title, keyword }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const rowRef = useRef(null);

    const fetchMovies = useCallback(async () => {
        // Ensure loading is set to true before fetch
        setLoading(true);
        // Clear previous errors
        setError(null);

        // Handle "popular" keyword replacement as requested
        const effectiveKeyword = keyword.toLowerCase() === 'popular' ? 'Avengers' : keyword;

        console.log("[MovieRow] Fetching:", effectiveKeyword);

        try {
            // Service returns array of movies or throws error if Response="False"
            const results = await getMoviesByKeyword(effectiveKeyword);

            console.log("[MovieRow] Response:", results);

            if (results && Array.isArray(results) && results.length > 0) {
                setMovies(results);
            } else {
                // Handle empty results
                setMovies([]);
                setError("No Movies Found");
            }
        } catch (err) {
            console.error("[MovieRow] Error:", err);
            // If OMDB returns { Response: "False" } or other error
            setMovies([]);
            setError("No Movies Found"); // Or use err.message if preferred, but "No Movies Found" is safe UI
        } finally {
            // Ensure loading is set to false in finally block
            setLoading(false);
        }
    }, [keyword]); // Only re-create if keyword changes

    // Ensure useEffect dependency array is correct
    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return (
        <div className="space-y-4 py-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white px-4 md:px-12 hover:text-red-500 transition-colors cursor-pointer">
                {title}
            </h2>

            <div className="relative group/row min-h-[240px] md:min-h-[300px]">
                {error ? (
                    <div className="px-4 md:px-12 flex items-center justify-center h-[240px] md:h-[300px] bg-neutral-900/20 rounded-lg">
                        <ErrorFallback message={error} onRetry={fetchMovies} />
                    </div>
                ) : (
                    <div
                        ref={rowRef}
                        className="flex gap-4 overflow-x-scroll scrollbar-hide px-4 md:px-12 pb-4 scroll-smooth"
                    >
                        {loading ? (
                            <SkeletonLoader count={6} type="card" />
                        ) : (
                            movies.map((movie) => (
                                <MovieCard key={movie.imdbID} movie={movie} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieRow;
