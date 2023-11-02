/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fill: {
                blue: 'blue',
                red: 'red',
                white: 'white',
            },
            backgroundImage: {
                bgimg: 'url(home.jpg)',
            },
        },
    },
    plugins: [],
}
