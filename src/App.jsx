import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PokedexList from './components/pages/PokedexList';
import PokemonDetails from './components/pages/PokemonDetails';
import NoPage from './components/pages/NoPage';
import Searchbar from './components/layout/Searchbar';

function App() {
	return (
		<BrowserRouter>
			<Routes path="/" element={<PokedexList />}>
				<Route index element={<PokedexList />} />
				<Route path="details" element={<PokemonDetails />} />
				<Route path="*" element={<NoPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
