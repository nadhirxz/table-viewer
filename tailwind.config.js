module.exports = {
	content: ['./src/react/**/*.tsx', './src/react/*.tsx'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				ubuntu: ['Ubuntu', 'normal'],
				robotomono: ['Roboto Mono', 'normal'],
			},
			colors: {
				gray: {
					850: '#151D2B',
				},
				primary: {
					100: '#9AC5FE',
					200: '#72AEFE',
					300: '#4897FE',
					400: '#2080FE',
					500: '#016AF4',
					600: '#0159CB',
					700: '#0147A2',
					800: '#01357A',
					900: '#012351',
				},
				success: {
					100: '#9DFBCC',
					200: '#75FAB8',
					300: '#4EF9A3',
					400: '#26F78F',
					500: '#09EC7A',
					600: '#07C566',
					700: '#069D52',
					800: '#04763D',
					900: '#034E29',
				},
				danger: {
					100: '#FFA299',
					200: '#FF7C70',
					300: '#FF5747',
					400: '#FF311F',
					500: '#F51400',
					600: '#CC1100',
					700: '#A30E00',
					800: '#7A0A00',
					900: '#510700',
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
