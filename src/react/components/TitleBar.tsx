import React, { useContext, useRef, useState } from 'react';
import maxIcon from '../assets/max-k-10.png';
import minIcon from '../assets/min-k-10.png';
import restoreIcon from '../assets/restore-k-10.png';
import closeIcon from '../assets/close-k-10.png';
import maxIconWhite from '../assets/max-w-10.png';
import minIconWhite from '../assets/min-w-10.png';
import restoreIconWhite from '../assets/restore-w-10.png';
import closeIconWhite from '../assets/close-w-10.png';
import lightModeIcon from '../assets/light-mode.svg';
import darkModeIcon from '../assets/dark-mode.svg';
import reloadDark from '../assets/reload-dark.svg';
import reloadLight from '../assets/reload-light.svg';
import { BrowserWindow } from '@electron/remote';
import { ThemeContext } from '@/utils/context';
import { useHotkeys } from 'react-hotkeys-hook';

interface Props {
	title: string;
}

const TitleBar: React.FC<Props> = (props: Props) => {
	const win = BrowserWindow.getFocusedWindow();
	const { darkTheme, setDarkTheme } = useContext(ThemeContext);
	const [maximized, setMaximized] = useState(win?.isMaximized() || false);

	const switchButton = useRef<HTMLDivElement>(null);
	useHotkeys('ctrl+d', () => {
		switchButton.current?.click();
	});

	const close = () => win?.close();
	const minimize = () => win?.minimize();
	const maximize = () => {
		win?.maximize();
		setMaximized(true);
	};
	const restore = () => {
		win?.unmaximize();
		setMaximized(false);
	};

	win?.on('maximize', () => setMaximized(true));
	win?.on('unmaximize', () => setMaximized(false));

	return (
		<div className="titlebar flex min-h-[30px] z-50">
			<p className="m-auto text-sm">{props.title}</p>
			<div className="absolute top-0 right-0 h-[30px] flex">
				<div className="m-auto titlebar-button" onClick={() => window.location.reload()} ref={switchButton}>
					<img className="titlebar-icon w-5" src={darkTheme ? reloadLight : reloadDark} />
				</div>
				<div className="m-auto titlebar-button" onClick={() => setDarkTheme && setDarkTheme(!darkTheme)} ref={switchButton}>
					<img className="titlebar-icon w-5" src={darkTheme ? darkModeIcon : lightModeIcon} />
				</div>
				<div className="m-auto h-full">
					<div className="titlebar-button" onClick={minimize}>
						<img className="titlebar-icon" src={darkTheme ? minIconWhite : minIcon} />
					</div>
					{!maximized && (
						<div className="titlebar-button" onClick={maximize}>
							<img className="titlebar-icon" src={darkTheme ? maxIconWhite : maxIcon} />
						</div>
					)}
					{maximized && (
						<div className="titlebar-button" onClick={restore}>
							<img className="titlebar-icon" src={darkTheme ? restoreIconWhite : restoreIcon} />
						</div>
					)}
					<div className="titlebar-button hover:!bg-danger-400" onClick={close}>
						<img className="titlebar-icon" src={darkTheme ? closeIconWhite : closeIcon} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TitleBar;
