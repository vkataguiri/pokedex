import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import PokemonCard from '../pokemon/PokemonCard';
import Searchbar from '../layout/Searchbar';
import LoadingSvg from '../layout/LoadingSvg';

function PokedexList() {
	const [searchParams, setSearchParams] = useSearchParams();

	const [pokemonList, setPokemonList] = useState([]);
	const [filteredList, setFilteredList] = useState([]);
	const [sortType, setSortType] = useState('number');
	const [isLoading, setIsLoading] = useState(true);

	// Get pokemons from PokeAPI
	useEffect(() => {
		const abortController = new AbortController();

		const fetchPokemonList = async () => {
			// First get the raw Pokemon list
			try {
				const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1115', {
					signal: abortController.signal, // Abort signal to prevent double pokemon cards due to React Strict Mode
				});
				const data = await response.json();

				// Then, get the equivalent Pokemon objects for each item of the raw list
				const allPokemonData = await Promise.all(
					data.results.map(async (pokemon) => {
						const response = await fetch(pokemon.url);
						const pokemonData = await response.json();
						return pokemonData;
					})
				);

				setPokemonList(allPokemonData);
				setFilteredList(allPokemonData);
				setIsLoading(false);
			} catch (err) {
				console.error('Error while trying to get pokemon list: ', err);
			}
		};

		fetchPokemonList();

		document.getElementById('defaultSearch').value = searchParams.get('q');

		return () => {
			// cancel the fetch request when the effect is unmounted
			abortController.abort('Ignore this. Preventing double mounting caused by StrictMode.');
		};
	}, []);

	// Filter pokemon list by URL params
	function filterListByQuery(query) {
		if (!query) return setFilteredList(pokemonList); // Return entire list if query is empty

		const filteredPokemon = pokemonList.filter(
			(pokemon) => pokemon.name.toLowerCase().includes(query) || pokemon.id == query
		);

		sortList(filteredPokemon);
		setFilteredList(filteredPokemon);
	}

	// Filter list when search params is changed
	useEffect(() => {
		if (!isLoading) {
			const query = searchParams.get('q');
			filterListByQuery(query);
		}
	}, [searchParams, isLoading]);

	function searchPokedex(e) {
		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);
			params.set('q', e.target.value);
			return params;
		});
	}

	function changeSortType(e) {
		const sortBy = e.target.value;
		setSortType(sortBy);

		setSearchParams((prev) => {
			const params = new URLSearchParams(prev);
			params.set('sort', sortBy);
			return params;
		});
	}

	function sortList(pokeList) {
		if (sortType === 'number') {
			const newList = [...pokeList].sort((a, b) => {
				const num1 = a.id;
				const num2 = b.id;
				return num1 < num2 ? -1 : num1 > num2 ? 1 : 0;
			});
			pokeList = newList;
		} else if (sortType === 'name') {
			const newList = [...pokeList].sort((a, b) => {
				const name1 = a.name;
				const name2 = b.name;
				return name1 < name2 ? -1 : name1 > name2 ? 1 : 0;
			});
			pokeList = newList;
		} else {
			console.error('Error: sort value is neither numbers nor names.');
		}

		return pokeList;
	}

	useEffect(() => {
		setFilteredList(sortList(filteredList));
	}, [sortType]);

	return (
		<div>
			<Searchbar handleSearchbarChange={searchPokedex} handleSelectChange={changeSortType} />
			<ul className="flex flex-wrap justify-center">
				{filteredList.map((pokemon, index) => (
					<PokemonCard pokemon={pokemon} key={index} />
				))}
			</ul>
			{filteredList.length < 1 &&
				(isLoading ? (
					<div className="m-5 flex flex-col items-center">
						<LoadingSvg />
						<p className="text-center font-light">Loading Pokémon list...</p>
					</div>
				) : (
					<p className="p-5 text-center font-light">No Pokémon found.</p>
				))}
		</div>
	);
}

export default PokedexList;
