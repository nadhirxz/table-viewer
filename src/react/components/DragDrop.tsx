import { invoke } from '@/utils/ipc';
import { Response } from '@/utils/types';
import { ACCEPTED_FILE_TYPES } from '@/utils/values';
import React, { useState } from 'react';

interface Props {
	setTableData: (data: React.Dispatch<React.SetStateAction<any[]>>) => void;
	className?: string;
}

const DragDrop: React.FC<Props> = (props: Props) => {
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState<Response['error']>('');

	const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			setLoading(true);

			invoke('open-file', { path: file.path }).then((res: Response) => {
				console.log(res);

				if (!res.success) {
					setErr(res.error);
				} else {
					props.setTableData(res.data);
				}

				console.log(res);

				setLoading(false);
			});
		} else {
			setErr('no file selected');
		}
	};

	return (
		<>
			<div className={props.className ?? 'w-1/3'}>
				<div className="flex flex-col my-auto mx-auto w-full justify-center">
					<label className="flex justify-center h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
						<span className="flex items-center space-x-2">
							<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
							</svg>
							<span className="font-medium text-gray-600">Click to select a file</span>
						</span>
						<input type="file" name="file_upload" accept={ACCEPTED_FILE_TYPES.join(', ').trim()} className="hidden" onChange={selectFile} />
					</label>
					{!loading && <span className="invalid-text text-center">{err}</span>}
				</div>
			</div>
		</>
	);
};

export default DragDrop;
