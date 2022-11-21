export const formatTextForSearch = (string: string) =>
	string
		.replace(/\s/g, '')
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase();
