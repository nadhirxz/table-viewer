import { app, BrowserWindow, ipcMain } from 'electron';
import * as remote from '@electron/remote/main';
import dotenv from 'dotenv';
import path from 'path';
import { ACCEPTED_FILE_TYPES } from '@/utils/values';
import { parseDocx, parseXlsx } from './parse';
import xlsx from 'node-xlsx';
import { writeFileSync } from 'original-fs';
import os from 'os';
dotenv.config();

const isDev = !app.isPackaged;

const createWindow = () => {
	const win = new BrowserWindow({
		show: false,
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
		frame: false,
	});

	remote.initialize();
	remote.enable(win.webContents);

	win.maximize();
	win.show();
	win.on('closed', () => app.quit());

	win.loadURL(isDev ? `http://localhost:${process.env.PORT || 3000}` : `file://${__dirname}/react/index.html`);
};

app.on('ready', createWindow);

ipcMain.handle('open-file', async (_, data) => {
	const filePath = path.parse(data.path);
	if (!ACCEPTED_FILE_TYPES.includes(filePath.ext)) {
		return { success: false, error: 'file-type' };
	}

	if (['.docx', '.doc'].includes(filePath.ext)) {
		try {
			const result = await parseDocx(path.resolve(filePath.dir, filePath.base));

			if (!result.length) return { success: false, error: 'no-data' };

			return { success: true, data: result };
		} catch (error) {
			console.log(error);
			return { success: false, error: 'parse-error' };
		}
	}

	try {
		const result = await parseXlsx(path.resolve(filePath.dir, filePath.base));
		return { success: true, data: result };
	} catch (error) {
		return { success: false, error: 'parse-error' };
	}
});

ipcMain.handle('export', (_, data) => {
	const fileName = `table_${Date.now()}`;

	try {
		const buffer = xlsx.build([{ name: ' ', data: [Object.keys(data[0]), ...data.map((item: any) => Object.values(item))], options: {} }]);

		writeFileSync(`${os.homedir()}/Desktop/${fileName}.xlsx`, buffer, 'binary');

		return { success: true, message: fileName };
	} catch (error) {
		return { success: false, error: 'export-error' };
	}
});
