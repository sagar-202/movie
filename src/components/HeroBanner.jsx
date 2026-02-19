import { useState, useEffect } from 'react';
import { searchMovies, getMovieDetails } from '../services/omdb';
import SkeletonLoader from './SkeletonLoader';
import ErrorFallback from './ErrorFallback';

const HeroBanner = () => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHeroMovie = async () => {
        try {
            setLoading(true);
            setError(null);
            // Fetch Guardians of the Galaxy Vol. 2 as the hero movie
            const heroId = 'tt3896198';
            const details = await getMovieDetails(heroId);
            console.log('[HeroBanner] Fetched Hero Movie:', details);
            if (details) {
                setMovie(details);
            } else {
                console.warn('[HeroBanner] Movie not found');
                setError('Movie not found');
            }
        } catch (err) {
            console.error('Failed to fetch hero movie', err);
            setError('Failed to load featured movie');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHeroMovie();
    }, []);

    if (loading) {
        return <SkeletonLoader type="banner" />;
    }

    if (error) {
        return (
            <div className="h-[85vh] w-full flex items-center justify-center bg-neutral-900">
                <div className="max-w-md w-full px-4">
                    <ErrorFallback message={error} onRetry={fetchHeroMovie} />
                </div>
            </div>
        );
    }

    if (!movie) return null;

    return (
        <div className="relative h-[85vh] w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
                style={{
                    backgroundImage: `url(${movie.Poster !== 'N/A' ? movie.Poster.replace('SX300', 'SX1920') : ''})`,
                }}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/40 to-black/10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center pt-20">
                <div className="max-w-xl space-y-4 animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg leading-tight">
                        {movie.Title}
                    </h1>

                    <div className="flex items-center gap-4 text-gray-300 text-sm md:text-base font-medium">
                        <span className="text-green-400">{movie.imdbRating} IMDB</span>
                        <span>{movie.Year}</span>
                        <span className="border border-gray-500 px-2 py-0.5 rounded text-xs">{movie.Rated}</span>
                        <span>{movie.Runtime}</span>
                    </div>

                    <p className="text-lg text-gray-200 line-clamp-3 md:line-clamp-4 drop-shadow-md">
                        {movie.Plot}
                    </p>

                    <div className="flex items-center gap-4 pt-4">
                        <button className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-gray-200 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            Play
                        </button>
                        <button className="flex items-center gap-2 bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-gray-500/50 transition-colors backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            More Info
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
