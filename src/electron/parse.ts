import mammoth from 'mammoth';
import * as cheerio from 'cheerio';
import xlsx from 'node-xlsx';

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
						// get all html elements inside td
						const html = $(td).html();
						row.push(html?.replace('</p><p>', '\n').replace(/(<([^>]+)>)/gi, ''));
					});
				table.push(row);
			});
	});

	const heads = table[0];
	const rows = table.slice(1);

	return formatData(heads, rows);
};

export const parseXlsx = async (filePath: string) => {
	const data = xlsx.parse(filePath);

	const heads = data[0].data[0];
	const rows = data[0].data.slice(1);

	return formatData(heads, rows);
};

export const formatData = (heads: any, rows: any[]) => {
	const result: any[] = [];

	rows.forEach(row => {
		const obj: any = {};
		row.forEach((cell: any, i: number) => {
			obj[heads[i]] = cell;
		});
		result.push(obj);
	});

	if (heads.includes('رقم الهاتف')) return result.filter((v, i, a) => a.findIndex(v2 => v2['رقم الهاتف'] === v['رقم الهاتف']) === i);

	return result;
};
