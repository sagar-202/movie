import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';

const Home = () => {
    return (
        <div className="bg-[#141414] min-h-screen pb-20">
            <HeroBanner />

            <div className="relative z-20 space-y-8 pl-4 md:pl-8 -mt-16 md:-mt-32">
                <MovieRow title="Popular on MOVIEZ" keyword="Avengers" />
                <MovieRow title="Action Movies" keyword="Batman" />
                <MovieRow title="Drama Movies" keyword="Drama" />
                <MovieRow title="Comedy Movies" keyword="Comedy" />
            </div>
        </div>
    );
};

export default Home;
