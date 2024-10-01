import { useNavigate } from 'react-router-dom';
import TypeTag from '../layout/TypeTag';

function PokemonCard({ pokemon }) {
	const navigate = useNavigate();

	return (
		<button
			onClick={() => {
				navigate(`/details?id=${pokemon.id}`);
			}}
			className="m-3 flex h-52 w-32 cursor-pointer flex-col items-center justify-center rounded-md bg-white shadow-md duration-150 hover:bg-slate-300 lg:w-40"
		>
			<p className="w-full px-3 text-right">
				{pokemon.id < 1164 ? `#${pokemon.id.toString().padStart(3, '0')}` : 'SP'}
			</p>
			{pokemon.sprites ? (
				<img src={pokemon.sprites.front_default} alt={pokemon.name} className="select-none" />
			) : (
				<LoadingSvg width="16px" height="16px" />
			)}
			<h1 className="mb-2 text-sm font-bold capitalize lg:text-base">{pokemon.name || 'Loading...'}</h1>
			<ul className="flex">
				{pokemon.types.map((typeArr, index) => (
					<TypeTag key={index} type={typeArr.type.name} />
				))}
			</ul>
		</button>
	);
}

export default PokemonCard;
