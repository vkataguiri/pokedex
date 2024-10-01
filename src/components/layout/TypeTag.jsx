import { useEffect, useState } from 'react';
import types from '../../localTypes';

function TypeTag({ type }) {
	const [color, setColor] = useState('');

	useEffect(() => {
		const filteredType = types.filter((arrType) => arrType.name === type);
		setColor(filteredType[0].color);
	}, []);

	return (
		<li
			style={{ backgroundColor: `${color || 'gray'}` }}
			className="mx-1 rounded-md p-1 capitalize text-white shadow-md"
		>
			{type || 'Loading type...'}
		</li>
	);
}

export default TypeTag;
