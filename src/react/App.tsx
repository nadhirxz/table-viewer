import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';
import { saveTheme, theme } from '@/utils/storage';
import { ThemeContext } from '@/utils/context';
import TitleBar from './components/TitleBar';
import { AnimatePresence } from 'framer-motion';
import DragDrop from './components/DragDrop';
import './App.css';

const App: React.FC = () => {
	const [darkTheme, setTheme] = useState(theme == 'dark');
	const title = 'Excel Viewer';

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
					<AnimatePresence>
						<div className="flex w-full h-full justify-center items-center">
							<DragDrop className="flex mx-auto my-auto w-96 h-full" />
						</div>
					</AnimatePresence>
				</div>
			</ThemeContext.Provider>
		</div>
	);
};

export default hot(App);
