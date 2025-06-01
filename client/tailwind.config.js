/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))', /* Main Black/Dark Grey */
					foreground: 'hsl(var(--primary-foreground))', /* Light Grey/White for text on primary */
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))', /* Medium Grey */
					foreground: 'hsl(var(--secondary-foreground))', /* Darker Grey/Black for text on secondary */
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))', /* Lighter Grey */
					foreground: 'hsl(var(--muted-foreground))', /* Dark Grey for text on muted */
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))', /* A slightly off-black or dark charcoal for accents */
					foreground: 'hsl(var(--accent-foreground))', /* Light Grey/White for text on accent */
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
        brand: { /* Using shades of grey for brand too, can be adjusted if a specific brand color is needed */
          light: 'hsl(var(--muted))',
          DEFAULT: 'hsl(var(--secondary))',
          dark: 'hsl(var(--primary))',
        },
        highlight: { /* Using a contrasting light grey or white for highlights */
          light: 'hsl(0 0% 90%)', 
          DEFAULT: 'hsl(0 0% 80%)',
          dark: 'hsl(0 0% 70%)',
        }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0px' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0px' },
				},
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};