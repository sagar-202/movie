import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = React.memo(({ movie }) => {
    return (
        <Link
            to={`/movie/${movie.imdbID}`}
            className="flex-none w-[160px] md:w-[200px] h-[240px] md:h-[300px] relative group focus:outline-none"
        >
            <div className="w-full h-full rounded-md overflow-hidden relative transition-transform duration-300 ease-in-out group-hover:scale-[1.08] group-hover:shadow-[0_0_20px_rgba(220,38,38,0.6)] group-hover:z-10">
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <h3 className="text-white font-bold text-sm md:text-base leading-tight drop-shadow-md">
                        {movie.Title}
                    </h3>
                    <p className="text-red-500 text-xs font-semibold mt-1">
                        {movie.Year}
                    </p>
                </div>
            </div>
        </Link>
    );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;
