// Dropdown
export const characterSearchOptions = [
	{ id: 1, value: "", title: "All Characters", key: "all_characters" },
	{ id: 2, value: "male", title: "Male Characters", key: "male_characters" },
	{ id: 3, value: "female", title: "Female Characters", key: "female_characters" },
	{ id: 4, value: "unknown", title: "Unknown Characters",key: "unkown_characters" },
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
