import { ipcRenderer } from 'electron';

export const invoke = (channel: string, data?: object) => ipcRenderer.invoke(channel, data);
