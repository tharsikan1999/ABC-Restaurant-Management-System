const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center bg-white dark:bg-CustomBlack bg-opacity-60 ">
      <div>
        <svg
          className="animate-spin -ml-1 mr-3 h-12 w-12 text-CustomBlue"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="#3b82f6" /> {/* from-blue-500 */}
              <stop offset="50%" stopColor="#2563eb" /> {/* via-blue-600 */}
              <stop offset="100%" stopColor="#1d4ed8" /> {/* to-blue-700 */}
            </linearGradient>
          </defs>
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
          ></circle>
          <path
            className="opacity-75"
            fill="url(#gradient)" // Apply the gradient fill here
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Spinner;
