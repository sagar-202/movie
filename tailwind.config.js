/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#141414', // Using a name for reference, though global styles handle background
            },
        },
    },
    plugins: [],
}
