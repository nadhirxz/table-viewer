import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';
import { saveTheme, theme } from '@/utils/storage';
import { ThemeContext } from '@/utils/context';
import TitleBar from './components/TitleBar';
import { AnimatePresence } from 'framer-motion';
import DragDrop from './components/DragDrop';
import './App.css';
import Table from './components/Table';

const objectMap = (obj: object, fn: any) => Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

const App: React.FC = () => {
	const [darkTheme, setTheme] = useState(theme == 'dark');
	const [tableData, setTableData] = useState<any>([]);

	const title = 'Table Viewer';

	useEffect(() => {
		document.title = title;

		if (darkTheme) document.documentElement.classList.add('dark');
	}, []);

	const setDarkTheme = (val: boolean) => {
		setTheme(val);
		saveTheme(val ? 'dark' : 'light');
		val ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
	};

	return (
		<div className="h-screen flex flex-col overflow-hidden">
			<ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
				<TitleBar title={title} />
				<div className="app">
					<main className={`main p-4 flex flex-col items-center ${!!tableData.length ? '' : 'justify-center'}`}>
						<AnimatePresence>
							{!tableData.length && <DragDrop setTableData={setTableData} />}
							{!!tableData.length && (
								<Table
									titles={Object.keys(tableData[0]).map(e => ({ name: e, key: e }))}
									sorting={Object.fromEntries(Object.keys(tableData[0]).map(e => [e, { clicked: false, desc: false }]))}
									searchKeys={Object.keys(tableData[0])}
									elements={tableData.map((e: any, idx: number) => ({
										_id: idx,
										...objectMap(e, (v: any) => ({ text: v })),
									}))}
								/>
							)}
						</AnimatePresence>
					</main>
				</div>
			</ThemeContext.Provider>
		</div>
	);
};

export default hot(App);
