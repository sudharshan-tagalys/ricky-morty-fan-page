import React, { useEffect, useState } from "react";

// Tab
let tabConfig = {
	id: "universe",
	tabs: [
		{
			id: "earth",
			title: "Earth",
			panel: "Inside Earth pannel",
			type: "default",
			isEditEnabled: false,
			characterList: [],
			charactersListPerPage:[],
		},
	],
	selectedTabId: "",
};

const customUniverseInitialState = {
	title: "",
	tabConfig: {},
	tabs: [],
	selectedUniverseTabId: 0,
	isTitleSaved: false,
	onChangeTitle: () => {},
	onSaveTitle: () => {},
	onEditTitle: () => {},
	onCancelTitle: () => {},
	onTabChangeHandler: () => {},
	onToggleEditHandler: () => {},
	onCharacterAddToHandler: () => {},
};

const CustomUniverseContext = React.createContext(customUniverseInitialState);

export const CustomUniverseContextProvider = (props) => {
	const [customUniverseTitle, setCustomUniverseTitle] = useState("");
	const [isEditCustomUniverseEnabled, setIsEditCustomUniverseEnabled] =
		useState(false);

	const [selectedUniverseTabId, setSelectedUniverseTabId] = useState(
		tabConfig.tabs[0].id
	);

	const [tabList, setTabList] = useState(tabConfig.tabs);
	// console.log(`tabList`, tabList);

	const customUniverseChangeHandler = (event) => {
		console.log(`inside customUniverseChangeHandler fn`, event.target.value);
		setCustomUniverseTitle(event.target.value);
		setIsEditCustomUniverseEnabled(false);
	};

	const saveCustomUniverseHandler = (hideModalfn, event) => {
		console.log(`inside cancelCustomUniverseHandler fn event`, event);
		console.log(`inside cancelCustomUniverseHandler fn hideModalfn`, hideModalfn);
		// setIsEditCustomUniverseEnabled(true);
		setTabList((prevTabs) => {
			return [
				...prevTabs,
				{
					id: customUniverseTitle.toLocaleLowerCase(),
					title: customUniverseTitle,
					panel: `Inside ${customUniverseTitle} panel`,
					type: "custom",
					isEditEnabled: false,
					characterList: [],
					charactersListPerPage:[],
				},
			];
		});
		// hide modal
		hideModalfn();
		// clear title
		setCustomUniverseTitle('');
	};

	const editCustomUniverseHandler = (event) => {
		console.log(`inside editCustomUniverseHandler fn`);
		setIsEditCustomUniverseEnabled();
	};

	const cancelCustomUniverseHandler = (hideModalfn, event) => {
		console.log(`inside cancelCustomUniverseHandler fn event`, event);
		console.log(`inside cancelCustomUniverseHandler fn hideModalfn`, hideModalfn);
		// hide modal
		hideModalfn();
		// clear title
		setCustomUniverseTitle('');
	};


	const universeTabChangeHandler = (selectedUniverseId) => {
		console.log(`universeTabChangeHandler`, selectedUniverseId);
		setSelectedUniverseTabId(selectedUniverseId);
	};

	const customUniverseTabEditHandler = () => {
		console.log(
			`customUniverseTabEditHandler, selectedUniverseTabId`,
			selectedUniverseTabId
		);
		console.log(`tabList`, tabList);
	};

	const characterAddToTabHandler = (characterDetail, forTab) => {
		console.log(`characterAddToTabHandler`, characterDetail, forTab, tabList);
		let updatedTabList = tabList.map((tab) => {
			if (tab.id === forTab.id) {
				let formattedTab = {
					...tab,
					characterList: [...tab.characterList, characterDetail],
				};
				return formattedTab;
			}
			return tab;
		});
		console.log(`updatedTabList`, updatedTabList);
		setTabList(updatedTabList)
		// setTabList((prevTabList) => {
		// 	console.log(prevTabList)
		// 	updatedTabList(prevTabList, forTab, characterDetail);
		// });
	};

	// const updatedTabList = (tabList, forTab, characterDetail) => {
	// 	console.log(`updatedTabList tabList`, tabList)
	// 	return tabList.map((tab) => {
	// 			if (tab.id === forTab.id) {
	// 				let formattedTab = {
	// 					...tab,
	// 					characterList: [...tab.characterList, characterDetail],
	// 				};
	// 				return formattedTab;
	// 			}
	// 			return tab;
	// 		});			
	// }


	const defaultCustomUniverseState = {
		title: customUniverseTitle,
		tabConfig: tabConfig,
		tabs: tabList,
		selectedUniverseTabId: selectedUniverseTabId,
		isTitleSaved: isEditCustomUniverseEnabled,
		onSaveTitle: saveCustomUniverseHandler,
		onEditTitle: editCustomUniverseHandler,
		onCancelTitle: cancelCustomUniverseHandler,
		onChangeTitle: customUniverseChangeHandler,
		onTabChangeHandler: universeTabChangeHandler,
		onToggleEditHandler: customUniverseTabEditHandler,
		onCharacterAddToHandler: characterAddToTabHandler,
	};

	useEffect(() => {
		console.log(`inside effect - tablist change`, tabList)
	}, [tabList])

	return (
		<CustomUniverseContext.Provider value={defaultCustomUniverseState}>
			{props.children}
		</CustomUniverseContext.Provider>
	);
};

export default CustomUniverseContext;
