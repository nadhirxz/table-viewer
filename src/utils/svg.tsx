import React from 'react';

interface Props {
	className?: string;
	transparent?: boolean;
	fill?: string;
}

export const ArrowUp = (props: Props) => (
	<svg className={props.className ? props.className : ''} version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
	</svg>
);

export const ArrowDown = (props: Props) => (
	<svg className={props.className ? props.className : ''} version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
	</svg>
);

export const More = (props: Props) => (
	<svg className={props.className ? props.className : ''} version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>{' '}
	</svg>
);

export const PageFirst = (props: Props) => (
	<svg className={props.className ? props.className : ''} version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M18.41 16.59 13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />
	</svg>
);

export const PageLast = (props: Props) => (
	<svg className={props.className ? props.className : ''} version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M5.59 7.41 10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />
	</svg>
);

export const PageNext = (props: Props) => (
	<svg className={props.className ? props.className : ''} version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
	</svg>
);

export const PagePrev = (props: Props) => (
	<svg className={props.className ? props.className : ''} version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
	</svg>
);

export const Close: React.FC<Props & { onClick?: () => void }> = (props: Props & { onClick?: () => void }) => (
	<svg onClick={props.onClick} className={props.className} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path fill={props.fill || 'currentColor'} d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
	</svg>
);
