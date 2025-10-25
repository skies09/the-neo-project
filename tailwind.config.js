/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: {
			skyBlue: "#5ED3E8",
			aquamarine: "#ADFFD2",
			turquoise: "#5AEDD7",
			sunset: "#FFCF99",
			flax: "#FFF799",
			honeydew: "#F1FAEE",
			mintCream: "#F4FDF3",
			oxfordBlue: "#0B2545",
			ghost: "#F8F8FF",
			cherokee: "#FCCC99",
			yellowOrange: "#FFa24D",
			feta: "#F4FDF3",
			peppermint: "#F1FAEE",
			tomThumb: "#3A5A40",
			twilight: "#F0FFFF",
			titan: "#F9F9FF",

			highland: "#6C8B58",
			sprout: "#CAE0BC",
			tara: "#EAFAEA",

			bayleaf: "#84AE92",
			sark: "#5A827E",
		},
		fontFamily: {
			sans: ["Open Sans", "sans-serif"],
			serif: ["Playfair Display", "serif"],
			mono: ["Montserrat", "sans-serif"],
			satisfy: ["Satisfy", "cursive"],
			greatVibes: ["Great Vibes", "cursive"],
			poppins: ["Poppins", "sans-serif"],
			fredoka: ["Fredoka", "sans-serif"],
			comic: ["Comic Relief", "sans-serif"],
			delius: ["Delius", "cursive"],
			zain: ["Zain", "sans-serif"],
		},
		extend: {
			transitionDuration: {
				2000: "2000ms",
			},
			boxShadow: {
				"shadow-colorOne":
					"0 0 5px #00A8E8, 0 0 10px #00A8E8, 0 0 20px #00A8E8, 0 0 40px #00A8E8",
				"shadow-colorTwo":
					"0 0 5px #003459, 0 0 10px #003459, 0 0 20px #003459, 0 0 40px #003459",
			},
		},
	},
	plugins: [],
};
