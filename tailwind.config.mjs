/** @type {import('tailwindcss').Config} */
import animations from '@midudev/tailwind-animations'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			animation: {
				'infinite-scroll': 'infinite-scroll 25s linear infinite',
				'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
			},
			keyframes: {
				'infinite-scroll': {
				from: { transform: 'translateX(0)' },
				to: { transform: 'translateX(-100%)' }
				},
				'ping': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'75%, 100%': { transform: 'scale(2)', opacity: '0'}
				}
			},
                
		},
	},
	plugins: [animations],
}
