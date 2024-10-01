function PokemonStat({ name, value }) {
	function getStatWidth(val) {
		// get percentage of stat ranging from 0 to 255, to put it on the bar
		return `${(val / 255) * 100}%`;
	}

	return (
		<div className="space-y-2">
			<div className="flex items-center">
				<p className="pr2 w-[50px] select-none border-r border-gray-300 pr-3 text-right text-sm font-bold text-lime-600">
					{name}
				</p>
				<p className="w-[40px] select-none pr-3 text-right text-sm text-gray-700">
					{value.toString().padStart(3, '0')}
				</p>
				<div className="relative h-[7px] flex-1 overflow-hidden rounded-full bg-slate-300">
					<div className="h-full w-1/2 rounded-full bg-slate-500" style={{ width: getStatWidth(value) }}></div>
				</div>
			</div>
		</div>
	);
}

export default PokemonStat;
