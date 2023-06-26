import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import Header from "./layout/header/Header";
import Home from "./pages/home/Home";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import NotFound from "./pages/not-found/NotFound";
import Character from "./pages/character/Character";
import useHttp from "./hooks/use-http";
import CharacterList from "./components/character-list/CharacterList";
import Dropdown from "./UI/dropdown/Dropdown";
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";
import classes from "./App.module.css";
import Pagination from "./UI/pagination/Pagination";
import {
	characterSearchOptions,
	searchInputConfig,
	characterRadioInputConfig,
} from "./Utility/EarthTabConfig";
import { endpoints } from "./Utility/APIConfig";
import UseDialog from "./hooks/dialog/use-dialog";
import Login from "./pages/login/Login";
// import './style.scss'

// Pagination
const itemsPerPage = 4;

function App() {
	console.log(`L0 -- inside App Component`);

	// Tab
	let initialTabList = [
		{
			id: "earth",
			title: "Earth",
			type: "default",
		},
	];

	const [loggedIn, setLoggedIn] = useState(false)
	const history = useHistory()

	const [tabList, setTabList] = useState(initialTabList);
	const [selectedUniverseTabId, setSelectedUniverseTabId] = useState(
		initialTabList[0].id
	);
	const [searchCharacterByNameValue, setSearchCharacterByNameValue] =
		useState("");
	const [searchCharacterByGenderValue, setSearchCharacterByGenderValue] =
		useState(characterSearchOptions[0]);

	const [selectedCharacterByStatusValue, setSelectedCharacterByStatusValue] =
		useState("");
	const [activePage, setActivePage] = useState(1);
	const [customUniverseTitle, setCustomUniverseTitle] = useState("");
	const [modalTitle, setModalTitle] = useState("Create Universe");

	const [isShowModal, setIsShowModal] = useState(false);
	const [hasCustomUniverseTitleErrorMsg, setHasCustomUniverseTitleErrorMsg] =
		useState("");

	useEffect(() => {
		const localState = localStorage.getItem("loggedIn")
		setLoggedIn(localState == "true")
	}, [])


	const isLoggedIn = () => {
		const localState = localStorage.getItem("loggedIn")
		return localState == "true"
	}

	const onLogout = () => {
		localStorage.setItem('loggedIn', JSON.stringify(false));
		setLoggedIn(false)
		history.push('/login')
	}

	// ---------- Dialog ----------------
	const { isDialogOpen, openDialogHandler, closeDialogHandler } = UseDialog();
	// const [isDialogOpenCustom, setIsDialogOpen]	 = useState(false);
	const [dialogConfig, setDialogConfig] = useState({
		isDialogOpen: isDialogOpen,
		onCloseDialog: closeDialogHandler,
		title: "Failed",
		description: "Something went wrong!",
		dialogBtnList: [{ title: "OK", onClick: closeDialogHandler }],
	});
	// console.log(`in APP dialogConfig`, dialogConfig);
	// =========== Handlers  ===========

	// ---------- Tabs ----------------
	const onSelectedTabIDChangeHandler = (selectedUniverseId) => {
		// console.log(`onSelectedTabIDChangeHandler`, selectedUniverseId);
		setSelectedUniverseTabId(selectedUniverseId);
	};

	// ---------- Character Filter Options ----------------

	const selectedCharacterSearchOption = (selectedOption) => {
		// console.log(`inside selectedCharacterSearchOption`, selectedOption);
		setSearchCharacterByGenderValue(selectedOption);
		// setActivePage(1);
	};

	const searchInputHandler = (event) => {
		// console.log(`inside searchInputHandler`, event.target.value);
		setSearchCharacterByNameValue(event.target.value);
		// setActivePage(1);
	};

	const characterRadioInputHandler = (event) => {
		// console.log(`characterRadioInputHandler`, event.target.value);
		setSelectedCharacterByStatusValue(event.target.value);
		// setActivePage(1);
	};

	const resetSearchCharacterValues = () => {
		// console.log(`inisde resetSearchCharacterValues`);
		setSearchCharacterByNameValue("");
		setSearchCharacterByGenderValue(characterSearchOptions[0]);
		setSelectedCharacterByStatusValue("");
	};

	// ---------- Pagination ----------------

	const onPageNoChangeHandler = (event) => {
		// console.log(`inisde onPageNoChangeHandler`, event.target.value);
		// previous
		if (event.target.value === "previous") {
			setActivePage((prevActivePage) => {
				// console.log(
				// 	`inisde onPageNoChangeHandler previousActivePageNo`,
				// 	prevActivePage,
				// 	typeof prevActivePage,
				// 	+prevActivePage - 1
				// );
				return +prevActivePage - 1;
			});
			return;
		}
		// next
		if (event.target.value === "next") {
			setActivePage((prevActivePage) => {
				// console.log(
				// 	`inisde onPageNoChangeHandler previousActivePageNo`,
				// 	prevActivePage,
				// 	typeof prevActivePage,
				// 	+prevActivePage + 1
				// );
				return +prevActivePage + 1;
			});
			return;
		}
		setActivePage(+event.target.value);
	};

	// ---------- Modal ----------------

	const showModalHandler = () => {
		// console.log(`inside showModalHandler fn`);
		setIsShowModal(true);
	};

	const hideModalHandler = () => {
		// console.log(`inside hideModalHandler fn`);
		setIsShowModal(false);
	};

	// ---------- Custom Universe ----------------

	const onAddUniverseHandler = (event) => {
		// console.log(`inside 	onAddUniverseHandler fn`, event.target.value);
		setModalTitle("Create Universe");
		setSelectedUniverseTabId("earth");
		showModalHandler();
	};

	const onCustomUniverseInputChangeHandler = (event) => {
		// console.log(
		// 	`inside onCustomUniverseInputChangeHandler fn`,
		// 	event.target.value
		// );
		setCustomUniverseTitle(event.target.value);
	};

	const onSaveCustomUniverseTitleHandler = (event) => {
		// console.log(
		// 	`inside onSaveCustomUniverseTitleHandler fn`,
		// 	event.target.value
		// );

		// console.log(
		// 	`tab ID:${selectedUniverseTabId} , title: ${customUniverseTitle}`
		// );

		// reset
		setHasCustomUniverseTitleErrorMsg("");

		// check for default tabs
		const isDefaultTabAlreadyExist = getTabExistanceStatus(
			customUniverseTitle.toLowerCase(),
			"default"
		);

		if (isDefaultTabAlreadyExist) {
			// console.log(`already tab exist`);
			setHasCustomUniverseTitleErrorMsg("Universe Already Exist");
			return;
		}

		// check for Custom Tab With Same Name
		const isCustomTabAlreadyExistWithSameName = getTabExistanceStatus(
			customUniverseTitle.toLowerCase(),
			"custom"
		);

		if (isCustomTabAlreadyExistWithSameName) {
			// console.log(`already tab exist`);
			setHasCustomUniverseTitleErrorMsg("Universe Already Exist");
			return;
		}

		// for edit save
		const isCustomTabAlreadyExist = getTabExistanceStatus(
			selectedUniverseTabId,
			"custom"
		);

		// console.log(
		// 	`isTabAlreadyExist:, tabList:`,
		// 	isCustomTabAlreadyExist,
		// 	tabList
		// );

		// editing the tab  - with new id and title
		if (isCustomTabAlreadyExist) {
			updateTabListOnSave("edit");
		}

		// updating the tab list with new custom universe
		if (!isCustomTabAlreadyExist) {
			updateTabListOnSave("new");
		}

		// reset
		setSelectedUniverseTabId(customUniverseTitle.toLowerCase());
		setCustomUniverseTitle("");
		hideModalHandler();
	};

	const onCancelCustomUniverseTitleHandler = (event) => {

		hideModalHandler();
		// reset
		setCustomUniverseTitle("");
		setHasCustomUniverseTitleErrorMsg("");
	};

	const onEditCustomUniverseTitleHandler = () => {
		let selectedTabTitle = tabList.find(
			(tab) => tab.id === selectedUniverseTabId
		).title;
		setModalTitle("Edit Universe");
		setCustomUniverseTitle(selectedTabTitle);
		showModalHandler();
	};

	// ---------- Manage Users ----------------

	const onAddCharacterToCustomUniverseHandler = (
		selectedCharacter,
		selectedUniverse
	) => {
		setTabList((prevTabList) => {
			return prevTabList.map((tab) => {
				if (tab.id === selectedUniverse.id) {
					return {
						...tab,
						characterList: [...tab.characterList, selectedCharacter],
					};
				}
				return tab;
			});
		});
	};

	const onDeleteCharacterFromCustomUniverseHandler = (
		selectedCharacterDetails
	) => {
		setTabList((prevTabList) => {
			return prevTabList.map((tab) => {
				if (tab.id === selectedCharacterDetails.selectedTabId) {
					return {
						...tab,
						characterList: tab.characterList.filter(
							(character) => !(character.id === selectedCharacterDetails.id)
						),
						panel: (
							<CharacterList
								characterList={tab.characterList.filter(
									(character) => !(character.id === selectedCharacterDetails.id)
								)}
								selectedTabId={tab.id}
								onDeleteCharacterFromCustomUniverse={
									onDeleteCharacterFromCustomUniverseHandler
								}
							/>
						),
					};
				}
				return tab;
			});
		});
	};

	//  =========== Initialization ===========

	// console.log(`tabList`, tabList);

	//  =========== API Integration  ===========

	const transformCharactersList = (data) => {
		// console.log(`inside transformCharactersList`);
		console.log(data);
		let transformCharactersListData = data.results.map(
			({ id, name, status, image: avatar, gender, url: detail }) => ({
				id,
				name,
				status,
				avatar,
				gender,
				detail,
			})
		);
		// console.log(
		// 	`inside transformCharactersList-- transformCharactersListData`,
		// 	transformCharactersListData
		// );
		// reset	
		setActivePage(1);
		updateTabList(transformCharactersListData);
	};

	// ---------- API 1: On load ----------------

	const {
		isLoading: isFetchCharactersListLoading,
		error: fetchCharactersListHasError,
		setError: setFetchCharactersListHasError,
		sendRequest: fetchCharactersList,
	} = useHttp();

	useEffect(() => {
		// console.log(`inside useEffect home 1-- on load `);
		fetchCharactersList(
			{ url: getRequestUrl("all-characters") },
			transformCharactersList
		);
	}, [fetchCharactersList]);

	// ---------- API 2: On Filters (Search by Name, gender, status) ----------------

	const {
		isLoading: isSearchCharacterLoading,
		error: searchCharacterHasError,
		sendRequest: fetchSearchCharacter,
	} = useHttp();

	useEffect(() => {
		// console.log(
		// 	`inside useEffect app 2-- On Filters (Search by Name, gender, status)`
		// );
		// debouncing
		let timer = setTimeout(() => {
			const params = getRequestParams(
				searchCharacterByNameValue,
				searchCharacterByGenderValue.value,
				selectedCharacterByStatusValue
			);
			console.log(params);
			// fallback
			if (Object.keys(params).length === 0) {
				// on load avoid the api call twice
				if (!tabList[0].characterList) {
					// console.log(
					// 	`inside param fallback-- no data for characterList -- tabList[0].characterList`,
					// 	tabList[0].characterList
					// );
					return;
				}

				fetchCharactersList(
					{ url: getRequestUrl("all-characters") },
					transformCharactersList
				);
				return;
			}

			fetchSearchCharacter(
				{ url: getRequestUrl("filter-characters") + params },
				transformCharactersList
			);
		}, 750);

		return () => {
			// console.log(
			// 	`inside useEffect app 2-- CLEANUP -- On Filters (Search by Name, gender, status)`
			// );
			clearTimeout(timer);
			setFetchCharactersListHasError(null);
		};
	}, [
		searchCharacterByNameValue,
		searchCharacterByGenderValue,
		selectedCharacterByStatusValue,
		fetchSearchCharacter,
		fetchCharactersList,
	]);

	//  =========== Data Manipulation  ===========

	// ---------- searchCharacterByNameValue ----------------

	useEffect(() => {
		// console.log(`inside useEffect app 3-- searchCharacterByNameValue`);
		//fallback
		if (!tabList[0].characterList) {
			// console.log(
			// 	`inside activapage change -- fallback --  no data for characterList  -- tabList[0]?.characterList:`,
			// 	tabList[0]?.characterList
			// );
			return;
		}
		updateTabList(tabList[0].characterList);
	}, [searchCharacterByNameValue]);

	// ---------- activePage ----------------

	useEffect(() => {
		// console.log(`inside useEffect app 4-- activePage`);

		//fallback
		if (!tabList[0].characterList) {
			// console.log(
			// 	`inside activapage change -- fallback --  no data for characterList  -- tabList[0]?.characterList:`,
			// 	tabList[0]?.characterList
			// );
			return;
		}

		updateTabList(tabList[0].characterList);
	}, [activePage]);

	// ---------- selectedUniverseTabId ----------------
	useEffect(() => {
		// console.log(`inside useEffect app 5-- selectedUniverseTabId`);

		//fallback
		if (!tabList[0].characterList) {
			// console.log(
			// 	`inside selectedUniverseTabId change -- fallback --  no data for characterList  -- tabList[0]?.characterList:`,
			// 	tabList[0]?.characterList
			// );
			return;
		}

		updateTabList(tabList[0].characterList);
	}, [selectedUniverseTabId]);

	// ---------- Dialog ----------------

	useEffect(() => {
		// console.log(`inside useEffect app 6-- Dialog for errors`);
		// console.log(
		// 	`fetchCharactersListHasError: ${fetchCharactersListHasError}, searchCharacterHasError:${searchCharacterHasError}`
		// );
		if (fetchCharactersListHasError || searchCharacterHasError) {
			// On Load
			if (fetchCharactersListHasError) {
				// console.log(
				// 	`inside useEffect app 6-- Dialog for errors - fetchCharactersListHasError`
				// );
				updateDialogConfig(
					openDialogHandler,
					"Failed to Fetch Characters. Please try again later"
				);
			}
			// On Filters (Search by Name, gender, status)
			if (searchCharacterHasError) {
				// console.log(
				// 	`inside useEffect app 6-- Dialog for errors - searchCharacterHasError`
				// );
				updateDialogConfig(openDialogHandler, "Characters Not Found");
			}
		}
	}, [fetchCharactersListHasError, searchCharacterHasError, openDialogHandler]);

	useEffect(() => {
		// console.log(`inside useEffect app 7-- isOpen for errors`);
		updateDialogConfig(isDialogOpen);
	}, [isDialogOpen]);

	//  =========== Utility  ===========

	// ----------Utility 1: Data transformation -- updateTabList ----------------

	const updateTabList = (earthTabData) => {
		// console.log(`updateTabList --earthTabData:`, earthTabData);

		// earthTabData = activate page index calculation
		const { startIndex, endIndex } =
			getSelectedPageCharacterListIndexes(activePage);
		// console.log(`updateTabList -- activePage: ${activePage}`);
		// console.log(
		// 	`updateTabList -- startIndex: ${startIndex}, endIndex: ${endIndex}`
		// );
		// console.log(`updateTabList -- earthTabData: `, earthTabData);

		const selectedPageCharacterList = earthTabData.slice(startIndex, endIndex);

		// console.log(
		// 	`updateTabList -- selectedPageCharacterList: , 
		// 	`,
		// 	selectedPageCharacterList
		// );

		setTabList((prevTabList) => {
			return prevTabList.map((tab) => {
				if (tab.id === "earth") {
					return {
						...tab,
						characterList: earthTabData,
						panel: (
							<Fragment>
								<Pagination
									totalPagesCount={earthTabData?.length}
									itemsPerPage={itemsPerPage}
									onPageNoChange={onPageNoChangeHandler}
									activePage={activePage}
								/>
								<div className={classes["filter-container"]}>
									<Dropdown
										items={characterSearchOptions}
										onSelect={selectedCharacterSearchOption}
										selectedItemOption={searchCharacterByGenderValue}
									/>
									<Input
										inputConfig={{
											...searchInputConfig,
											onChangeHandler: searchInputHandler,
											value: searchCharacterByNameValue,
										}}
									/>
									<Button className="reset-cta-btn" data-action={"reset-filter"} onClick={resetSearchCharacterValues}>
										{" "}
										Reset Filter{" "}
									</Button>
								</div>
								-
								<Input
									inputConfig={{
										...characterRadioInputConfig,
										onChangeHandler: characterRadioInputHandler,
										selectedValue: selectedCharacterByStatusValue,
									}}
								/>
								<CharacterList
									characterList={selectedPageCharacterList}
									tabs={tabList}
									selectedTabId={tab.id}
									onAddCharacterToCustomUniverse={
										onAddCharacterToCustomUniverseHandler
									}
								/>
							</Fragment>
						),
					};
				}
				return {
					...tab,
					panel: (
						<CharacterList
							characterList={tab.characterList}
							selectedTabId={tab.id}
							onDeleteCharacterFromCustomUniverse={
								onDeleteCharacterFromCustomUniverseHandler
							}
						/>
					),
				};
			});
		});
	};

	// ----------Utility 2: Tab Existance ----------------

	const getTabExistanceStatus = (tabID, tabType) => {
		return tabList.some((tab) => tab.id === tabID && tab.type === tabType);
	};

	// ----------Utility 3: Data transformation -- updateTabList on save ----------------

	const updateTabListOnSave = (action) => {
		let formattedID = customUniverseTitle.toLocaleLowerCase();
		let formattedTitle =
			customUniverseTitle[0].toUpperCase() +
			customUniverseTitle.substring(1, customUniverseTitle.length);

		setTabList((prevTabList) => {
			if (action === "new") {
				return [
					...prevTabList,
					{
						id: formattedID,
						title: formattedTitle,
						characterList: [],
						panel: <CharacterList characterList={[]} />,
						type: "custom",
					},
				];
			}
			if (action === "edit") {
				return prevTabList.map((tab) => {
					if (tab.id === selectedUniverseTabId) {
						return {
							...tab,
							id: formattedID,
							title: formattedTitle,
						};
					}
					return tab;
				});
			}
		});
	};

	// ----------Utility 4: ActivePage Indexes ----------------
	const getSelectedPageCharacterListIndexes = (activePage) => {
		let endIndex = activePage * itemsPerPage;
		let startIndex = endIndex - itemsPerPage;

		return { startIndex, endIndex };
	};

	// ----------Utility 5: Dialog ----------------
	const updateDialogConfig = (isOpen, description) => {
		let isOpenHandler = typeof isOpen === "boolean" ? isOpen : isOpen();
		setDialogConfig((prevDialogConfig) => {
			return {
				...prevDialogConfig,
				isDialogOpen: isOpenHandler,
				description: description || prevDialogConfig.description,
			};
		});
	};

	// ----------Utility 6: Request params ----------------

	const getRequestUrl = (urlFor) => endpoints[urlFor];

	const getRequestParams = (name = "", gender = "", status = "") => {
		let params = {};
		let formattedParams = {};
		// isNameExist
		name.trim().length !== 0 && (params.name = name);

		// isGenderExist
		gender.trim().length !== 0 && (params.gender = gender);

		// isNameExist
		status.trim().length !== 0 && (params.status = status);

		//{ name: 'suresh', gender:'male'} --> name=suresh&gender=male
		if (Object.keys(params).length !== 0) {
			// console.log(`inisde params`);

			formattedParams = Object.entries(params).map((f) => ({
				key: f[0],
				value: f[1],
			}));

			formattedParams = formattedParams.reduce((acc, curr, i, arr) => {
				if (arr.length > 1 && i < arr.length - 1) {
					return `${acc}${curr.key}=${curr.value}&`;
				}
				return `${acc}${curr.key}=${curr.value}`;
			}, "");
		}

		return formattedParams;
	};

	return (
		<Fragment>
			<Header
				isShowModal={isShowModal}
				onCloseModal={hideModalHandler}
				modalTitle={modalTitle}
				onInputChange={onCustomUniverseInputChangeHandler}
				customUniverseTitle={customUniverseTitle}
				onCancelTitle={onCancelCustomUniverseTitleHandler}
				onSaveTitle={onSaveCustomUniverseTitleHandler}
				hasCustomUniverseTitleErrorMsg={hasCustomUniverseTitleErrorMsg}
				onAddUniverse={onAddUniverseHandler}
				onLogout={onLogout}
			/>
			<Switch>
				<Route path={"/"} exact>
					{isLoggedIn() ? <Redirect to="/home"/> : <Redirect to="/login"/>}
				</Route>
				<Route path="/login">
					{isLoggedIn() ? <Redirect to="/home"/> : <Login setLoggedIn={setLoggedIn}/>}
				</Route>
				<Route path={[`/home`, `/character/:character_id`]}>
					{isLoggedIn() ?
						<Fragment>
							<Route path="/home">
								<Home
									isLoading={isFetchCharactersListLoading || isSearchCharacterLoading}
									dialogConfig={dialogConfig}
									tabs={tabList}
									onSelectedTabChange={onSelectedTabIDChangeHandler}
									selectedTabId={selectedUniverseTabId}
									onEditTitle={onEditCustomUniverseTitleHandler}
								/>
							</Route>
							<Route path="/character/:character_id">
								<Character />
							</Route>
						</Fragment>
						:
						<Redirect to="/login"/>
					}
				</Route>
				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</Fragment>
	);
}

export default App;
