/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
		transitionTimingFunction: {
			'modal-transition-fn': 'cubic-bezier(0.165, 0.840, 0.440, 1.000);',
		}
		},
	},
	plugins: [],
}

