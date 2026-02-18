import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/omdb';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorFallback from '../components/ErrorFallback';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const data = await getMovieDetails(id);
                console.log(`[MovieDetails] Fetched details for ${id}:`, data);
                if (data) {
                    setMovie(data);
                } else {
                    setError('Movie not found');
                }
            } catch (err) {
                console.error('Failed to fetch movie details', err);
                setError('Failed to load movie details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDetails();
        }

        // Scroll to top on mount
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return <SkeletonLoader type="details" />;
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen bg-[#141414] flex items-center justify-center p-4">
                <div className="max-w-md w-full">
                    <ErrorFallback
                        message={error || 'Movie not found'}
                        onRetry={() => window.location.reload()}
                    />
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-gray-400 hover:text-white underline transition-colors"
                        >
                            Return to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#141414] text-white relative overflow-hidden">


            {/* Blurred Background */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30 blur-3xl scale-110"
                style={{ backgroundImage: `url(${movie.Poster !== 'N/A' ? movie.Poster : ''})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent"></div>

            <div className="container mx-auto px-4 py-24 relative z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back
                </button>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12 animate-fade-in-up">
                    {/* Poster */}
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                        <img
                            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                            alt={movie.Title}
                            className="w-[250px] md:w-[350px] rounded-lg shadow-2xl ring-1 ring-white/10"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-2">{movie.Title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm md:text-base">
                                <span className="text-white px-2 py-0.5 border border-gray-600 rounded text-xs">{movie.Rated}</span>
                                <span>{movie.Year}</span>
                                <span>{movie.Runtime}</span>
                                <span>{movie.Genre}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            {/* Ratings */}
                            {movie.Ratings && movie.Ratings.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-400 font-bold text-xl">{movie.imdbRating}</span>
                                    <span className="text-gray-500 text-sm">/10 IMDB</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Plot</h3>
                            <p className="text-gray-300 leading-relaxed max-w-2xl text-lg">
                                {movie.Plot}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                            <div>
                                <span className="block text-gray-500 text-sm">Director</span>
                                <span className="text-white">{movie.Director}</span>
                            </div>
                            <div>
                                <span className="block text-gray-500 text-sm">Cast</span>
                                <span className="text-white">{movie.Actors}</span>
                            </div>
                            <div>
                                <span className="block text-gray-500 text-sm">Writer</span>
                                <span className="text-white">{movie.Writer}</span>
                            </div>
                        </div>

                        <div className="pt-6 flex gap-4">
                            <button className="bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition-colors">
                                Play Movie
                            </button>
                            <button className="bg-gray-600/50 text-white px-8 py-3 rounded font-bold hover:bg-gray-600/70 transition-colors backdrop-blur-sm">
                                + My List
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
