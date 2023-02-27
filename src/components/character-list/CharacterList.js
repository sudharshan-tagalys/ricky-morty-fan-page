import React from "react";
import CharacterItem from "../character-item/CharacterItem";

import classes from "./CharacterList.module.css";

const CharacterList = (props) => {

	let characters = props.characterList?.length === 0 && (
		<li> No Characters Found.</li>
	);

	if (props.characterList?.length > 0) {
		characters = props.characterList.map((character) => {
			return (
				<CharacterItem
					key={character.id}
					id={character.id}
					avatar={character.avatar}
					name={character.name}
					status={character.status}
					gender={character.gender}
					detail={character.detail}
					tabs={props.tabs}
					selectedTabId={props.selectedTabId}
					onAddCharacterToCustomUniverse={props.onAddCharacterToCustomUniverse}
					onDeleteCharacterFromCustomUniverse={
						props.onDeleteCharacterFromCustomUniverse
					}
					// customUniverseTabs={props.customUniverseTabsList}
				/>
			);
		});
	}


	return (
		<div className={classes["character-list"]}>
			<ul>{characters}</ul>
		</div>
	);
};

export default CharacterList;
