const ErrorFallback = ({ message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-neutral-900/50 rounded-lg border border-neutral-800 w-full min-h-[200px]">
            <div className="text-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Something went wrong</h3>
            <p className="text-gray-400 mb-6 max-w-md">{message || "We couldn't load the content at this time."}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors"
                >
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorFallback;
