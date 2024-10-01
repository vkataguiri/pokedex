import { useState, useEffect } from 'react';

import PokemonCard from '../pokemon/PokemonCard';
import Searchbar from '../layout/Searchbar';

function PokedexList() {
	const [pokemonList, setPokemonList] = useState([]);
	const [filteredList, setFilteredList] = useState([]);
	const [sortType, setSortType] = useState('number');

	// Get pokemons from PokeAPI
	useEffect(() => {
		const abortController = new AbortController();

		const fetchPokemonList = async () => {
			// First get the raw Pokemon list
			try {
				const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1115', {
					signal: abortController.signal,
				});
				const data = await response.json();

				// Then, get the equivalent Pokemon objects for each item of the raw list
				data.results.forEach((element) => {
					const fetchPokemonData = async () => {
						try {
							const response = await fetch(element.url);
							const pokemonData = await response.json();

							setPokemonList((prevArr) => [...prevArr, pokemonData]);
							setFilteredList((prevArr) => [...prevArr, pokemonData]);
						} catch (err) {
							console.error(`Error while trying to get pokemon ${element.id}: ${err}`);
						}
					};
					fetchPokemonData();
				});
			} catch (err) {
				console.error('Error while trying to get pokemon list: ', err);
			}
		};

		fetchPokemonList();

		return () => {
			// cancel the fetch request when the effect is unmounted
			abortController.abort('Ignore this. Preventing double mounting caused by StrictMode.');
		};
	}, []);

	function searchPokedex(e) {
		const query = e.target.value.toLowerCase();

		const filteredPokemon = pokemonList.filter(
			(pokemon) => pokemon.name.toLowerCase().includes(query) || pokemon.id == query
		);

		sortList(filteredPokemon);
		setFilteredList(filteredPokemon);
	}

	function changeSortType(e) {
		const sortBy = e.target.value;

		setSortType(sortBy);
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
			{filteredList.length < 1 && <p className="p-5 text-center font-light">No Pokémon found.</p>}
		</div>
	);
}

export default PokedexList;
