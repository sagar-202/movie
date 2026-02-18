const SkeletonLoader = ({ type = 'card', count = 1 }) => {
    const renderSkeleton = () => {
        switch (type) {
            case 'banner':
                return (
                    <div className="h-[85vh] w-full bg-neutral-900 animate-pulse relative">
                        <div className="absolute bottom-20 left-4 md:left-12 space-y-4 w-full max-w-xl">
                            <div className="h-12 w-3/4 bg-neutral-800 rounded"></div>
                            <div className="flex gap-4">
                                <div className="h-6 w-16 bg-neutral-800 rounded"></div>
                                <div className="h-6 w-12 bg-neutral-800 rounded"></div>
                            </div>
                            <div className="h-24 w-full bg-neutral-800 rounded"></div>
                            <div className="flex gap-4">
                                <div className="h-12 w-32 bg-neutral-800 rounded"></div>
                                <div className="h-12 w-32 bg-neutral-800 rounded"></div>
                            </div>
                        </div>
                    </div>
                );
            case 'details':
                return (
                    <div className="min-h-screen bg-[#141414] animate-pulse">
                        <div className="h-[50vh] bg-neutral-900 w-full opacity-50"></div>
                        <div className="container mx-auto px-4 -mt-32 relative z-10 flex flex-col md:flex-row gap-8">
                            <div className="w-[250px] md:w-[350px] h-[375px] md:h-[525px] bg-neutral-800 rounded-lg shrink-0 mx-auto md:mx-0"></div>
                            <div className="flex-1 space-y-6 pt-12 md:pt-32">
                                <div className="h-12 w-3/4 bg-neutral-800 rounded"></div>
                                <div className="flex gap-4">
                                    <div className="h-6 w-16 bg-neutral-800 rounded"></div>
                                    <div className="h-6 w-16 bg-neutral-800 rounded"></div>
                                </div>
                                <div className="h-32 w-full bg-neutral-800 rounded"></div>
                            </div>
                        </div>
                    </div>
                );
            case 'card':
            default:
                return Array.from({ length: count }).map((_, i) => (
                    <div
                        key={i}
                        className="flex-none w-[160px] md:w-[200px] h-[240px] md:h-[300px] bg-neutral-800 rounded-md animate-pulse shrink-0"
                    ></div>
                ));
        }
    };

    return <>{renderSkeleton()}</>;
};

export default SkeletonLoader;
