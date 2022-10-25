/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		container: {
			center: true,
		},
		extend: {
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				letterFadeIn: {
					'0%': { bg: 'none' },
					'100%': { bg: 'blue' },
				},
			},
			animation: {
				fadeIn: 'fadeIn 1s ease-in-out',
			},
		},
	},
};
