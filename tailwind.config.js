import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                sage: {
                    50: '#EFF4F0',
                    100: '#D5E4D7',
                    200: '#AECAB2',
                    500: '#6B8F71',
                    600: '#5A7860',
                    700: '#4A6150',
                },
                cream: '#F5F0EB',
                'warm-gray': '#8C8377',
            },
        },
    },

    plugins: [forms],
};
