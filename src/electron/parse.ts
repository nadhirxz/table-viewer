import mammoth from 'mammoth';
import * as cheerio from 'cheerio';

export const parseDocx = async (filePath: string) => {
	const fileData = (await mammoth.convertToHtml({ path: filePath })).value;
	const $ = cheerio.load(fileData);

	// convert html table into json
	const table: any[] = [];
	$('table').each((i, elem) => {
		$(elem)
			.find('tr')
			.each((j, tr) => {
				const row: any[] = [];
				$(tr)
					.find('td')
					.each((k, td) => {
						row.push($(td).text().trim());
					});
				table.push(row);
			});
	});

	const heads = table[0];
	const rows = table.slice(1);

	const result: any[] = [];
	rows.forEach(row => {
		const obj: any = {};
		row.forEach((cell: any, i: number) => {
			obj[heads[i]] = cell;
		});
		result.push(obj);
	});

	return result;
};
