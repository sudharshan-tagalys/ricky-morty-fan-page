// Dropdown
export const characterSearchOptions = [
	{ id: 1, value: "", title: "All Characters" },
	{ id: 2, value: "male", title: "Male Characters" },
	{ id: 3, value: "female", title: "Female Characters" },
	{ id: 4, value: "unknown", title: "Unknown Characters" },
];

// Input
export const searchInputConfig = {
	id: "search-characters",
	type: "search",
	placeholder: "Search Characters here",
};

// Radio
export let characterRadioInputConfig = {
	id: "characters-status",
	type: "radio",
	className: "",
	label: "Status",
	options: [
		{ label: "Alive", value: "alive" },
		{ label: "Dead", value: "dead" },
		{ label: "Unknown", value: "unknown" },
	],
};
