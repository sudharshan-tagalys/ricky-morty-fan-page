import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./Character.module.css";
import Spinner from "../../UI/spinner/Spinner";
import Card from "../../UI/card/Card";

import { useParams } from "react-router-dom";
import {
	FaFemale,
	FaHeartbeat,
	FaMale,
	FaRedditAlien,
	FaSkullCrossbones,
} from "react-icons/fa";

const baseUrl = "https://rickandmortyapi.com/api/character/";

const Character = () => {
	const [characterDetail, setCharacterDetail] = useState({});

	const params = useParams();
	const url = `${baseUrl}${params.character_id}`;

	const transformCharacterDetail = (data) => {
		console.log(`inside transformCharacterDetail`, data);
		setCharacterDetail(data);
	};

	const { isLoading, error, sendRequest: fetchCharacterDetail } = useHttp();

	useEffect(() => {
		fetchCharacterDetail({ url }, transformCharacterDetail);
	}, [fetchCharacterDetail]);

	return (
		<div className={classes["character-container"]}>
			{isLoading && <Spinner />}
			<Card>
				<div>
					<div className={classes["character-basic-detail"]}>
						<h2> {characterDetail.name} </h2>
						<span>
							{characterDetail.gender === "Male" && <FaMale />}
							{characterDetail.gender === "Female" && <FaFemale />}
							<h6>{characterDetail.gender} </h6>
						</span>
						<span>
							{characterDetail.status === "Alive" && (
								<FaHeartbeat className={classes.alive} />
							)}
							{characterDetail.status === "Dead" && (
								<FaSkullCrossbones className={classes.dead} />
							)}
							{characterDetail.status === "unknown" && (
								<FaRedditAlien className={classes.unknown} />
							)}
							<h6>{characterDetail.status}</h6>
						</span>
					</div>
					<div className={classes["character-addon-detail"]}>
						<img src={characterDetail.image} alt="Character Avatar Not Found" />
						<div>
							<h2 htmlFor="Episodes">Episodes</h2>
							<ol
								id="Episodes"
								className={classes["character-addon-detail__link"]}
							>
								{characterDetail?.episode?.map((episodeItem) => {
									return (
										<li key={episodeItem}>
											<a href={episodeItem}>{episodeItem}</a>{" "}
										</li>
									);
								})}
							</ol>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Character;
