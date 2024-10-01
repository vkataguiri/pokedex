import { TbPokeball, TbSearch } from 'react-icons/tb';

function Searchbar({ handleSearchbarChange, handleSelectChange }) {
	return (
		<div className="flex h-16 w-full flex-wrap items-center justify-between bg-red-500 px-5">
			<TbPokeball className="text-3xl text-white" />

			<div className="relative mx-auto">
				<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
					<TbSearch className="text-xl text-slate-400" />
				</div>
				<input
					type="search"
					id="defaultSearch"
					onChange={handleSearchbarChange}
					className="block h-10 rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-slate-700 focus:border-blue-500 focus:ring-blue-500 sm:w-56 lg:w-96"
					placeholder="Search Pokémon"
				/>
			</div>

			<select name="sort" id="sort" className="rounded-fulll" onChange={handleSelectChange}>
				<option value="number">#</option>
				<option value="name">A</option>
			</select>
		</div>
	);
}

export default Searchbar;
