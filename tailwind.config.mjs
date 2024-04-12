/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'neue': ["Comic Neue", "cursive"],
				'italia': ["Italianno", "cursive"],
				'soon': ["Coming Soon", "cursive"],
				'lato': ["Lato", "sans-serif"]
		
			  }, fontWeight: {
				'neue-bold': 900,
			  }
		},
	},
	plugins: [],
}
