import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { RiRulerLine, RiWeightLine } from 'react-icons/ri';
import { FaArrowLeft } from 'react-icons/fa';

import TypeTag from '../layout/TypeTag';
import LoadingSvg from '../layout/LoadingSvg';
import PokemonStat from '../pokemon/PokemonStat';

function PokemonDetails() {
	const [searchParams, setSearchParams] = useSearchParams();
	const id = searchParams.get('id');
	const navigate = useNavigate();

	const [pokemon, setPokemon] = useState({});

	const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${id}/`;

	useEffect(() => {
		const fetchPokemonList = async () => {
			try {
				const response = await fetch(pokemonURL);
				const data = await response.json();

				setPokemon(data);
			} catch (err) {
				console.error('Error while trying to get pokemon: ', err);
			}
		};

		fetchPokemonList();
	}, [id]);

	return (
		<div className="m-auto w-full bg-white pb-16 pt-5 shadow-lg md:w-1/2 md:rounded-xl lg:w-1/2 lg:rounded-xl">
			<div className="flex justify-between p-10">
				<div className="flex items-center gap-3">
					<button onClick={() => navigate(-1)}>
						<FaArrowLeft className="cursor-pointe" />
					</button>
					<h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
				</div>
				<p className="font-bold">{id > 1164 ? 'SP' : `#${id.toString().padStart(3, '0') || '000'}`}</p>
			</div>

			<div className="flex w-full justify-center bg-slate-300 lg:bg-white">
				{pokemon.sprites ? (
					<img src={pokemon.sprites.front_default} alt={pokemon.name} className="h-[200px] select-none" />
				) : (
					<LoadingSvg width="200px" height="200px" />
				)}
			</div>

			<div>
				{/* Types */}
				<ul className="mt-5 flex justify-center gap-2">
					{pokemon.types && pokemon.types.map((typeArr, index) => <TypeTag key={index} type={typeArr.type.name} />)}
				</ul>
				{/* About */}
				<div>
					<h2 className="mt-5 text-center text-lg font-bold text-lime-600">About</h2>
					<div className="mt-5 flex">
						<p className="flex w-full flex-col items-center justify-center gap-2 border-r border-slate-300">
							<span className="flex items-center gap-2">
								<RiWeightLine /> {pokemon.weight / 10} kg
							</span>
							<span className="mt-3 text-sm font-light">Weight</span>
						</p>
						<p className="flex w-full flex-col items-center justify-center gap-2 border-r border-slate-300">
							<span className="flex items-center gap-2">
								<RiRulerLine /> {pokemon.height / 10} m
							</span>
							<span className="mt-3 text-sm font-light">Height</span>
						</p>
						<div className="flex w-full flex-col items-center justify-center gap-2">
							{pokemon.moves && (
								<ul className="flex flex-col items-start">
									<li className="flex items-center gap-2 capitalize">
										{pokemon.moves[0].move.name || 'Loading move...'}
									</li>
									<li className="flex items-center gap-2 capitalize">
										{pokemon.moves[1].move.name || 'Loading move...'}
									</li>
								</ul>
							)}
							<span className="mt-3 text-sm font-light">Moves</span>
						</div>
					</div>
				</div>
				{/* Stats */}
				<div>
					<h2 className="mt-5 text-center text-lg font-bold text-lime-600">Base Stats</h2>
					<div className="mt-2 w-full flex-col items-center px-5">
						{pokemon.stats && (
							<div className="m-auto lg:w-[430px]">
								<PokemonStat value={pokemon.stats[0].base_stat} name="HP" />
								<PokemonStat value={pokemon.stats[1].base_stat} name="ATK" />
								<PokemonStat value={pokemon.stats[2].base_stat} name="DEF" />
								<PokemonStat value={pokemon.stats[3].base_stat} name="SATK" />
								<PokemonStat value={pokemon.stats[4].base_stat} name="SDEF" />
								<PokemonStat value={pokemon.stats[5].base_stat} name="SPD" />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default PokemonDetails;
