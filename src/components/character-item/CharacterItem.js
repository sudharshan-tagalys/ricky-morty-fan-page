import React, { Fragment } from "react";

import classes from "./CharacterItem.module.css";

import Card from "../../UI/card/Card";

import {
	FaSkullCrossbones,
	FaHeartbeat,
	FaRedditAlien,
	FaMale,
	FaFemale,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Dropdown from "../../UI/dropdown/Dropdown";
import { Button } from "@blueprintjs/core";

const CharacterItem = (props) => {
	let customTabsList = [];

	//pending - to put check for earth
	if (props.tabs?.length > 0 && props.selectedTabId === "earth") {
		customTabsList = props.tabs.filter((tab) => tab.type === "custom");
	}

	return (
		<li className={classes["character-item"]} data-cy-character-id={props.id}>
			<Link to={`/character/${props.id}`}>
				<Card>
					<div className={classes["character-item__avatar"]}>
						<img src={props.avatar} alt="Character Avatar Not Found" />
					</div>
					<h6 className={classes["character-item__avatar-name"]}>
						{props.name}
					</h6>
				</Card>
			</Link>
			<div className={classes["character-item-details"]}>
				<span className={classes["character-item-details__status"]}>
					{props.status === "Alive" && (
						<FaHeartbeat className={classes.alive} />
					)}
					{props.status === "Dead" && (
						<FaSkullCrossbones className={classes.dead} />
					)}
					{props.status === "unknown" && (
						<FaRedditAlien className={classes.unknown} />
					)}
					<h6>{props.status}</h6>
				</span>
				<span className={classes["character-item-details__gender"]}>
					{props.gender === "Male" && <FaMale />}
					{props.gender === "Female" && <FaFemale />}
					<h6>{props.gender}</h6>
				</span>
			</div>
			<div className={classes["character-item-actions"]}>
				{props.tabs?.length > 0 &&
					props.selectedTabId === "earth" &&
					customTabsList.length > 0 && (
						<Fragment>
							<h5>Add To</h5>
							<Dropdown
								items={customTabsList}
								selectedItemOption={customTabsList[0]}
								onSelect={props.onAddCharacterToCustomUniverse.bind(
									null,
									props
								)}
							>
								Add To
							</Dropdown>
						</Fragment>
					)}
				{!(props.selectedTabId === "earth") && (
					<Button
						onClick={props.onDeleteCharacterFromCustomUniverse.bind(
							null,
							props
						)}
					>
						{" "}
						Kill{" "}
					</Button>
				)}
			</div>
		</li>
	);
};

export default CharacterItem;
