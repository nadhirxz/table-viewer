import { app, BrowserWindow, ipcMain } from 'electron';
import * as remote from '@electron/remote/main';
import dotenv from 'dotenv';
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
