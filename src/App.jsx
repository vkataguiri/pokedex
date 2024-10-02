import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';

import PokedexList from './components/pages/PokedexList';
import PokemonDetails from './components/pages/PokemonDetails';
import NoPage from './components/pages/NoPage';

function App() {
	return (
		<Routes path="/" element={<PokedexList />}>
			<Route index element={<PokedexList />} />
			<Route path="details" element={<PokemonDetails />} />
			<Route path="*" element={<NoPage />} />
		</Routes>
	);
}

export default App;
