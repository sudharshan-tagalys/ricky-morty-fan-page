import React from "react";
import { Link } from "react-router-dom";
import Button from "../../UI/button/Button";
import classes from "./Header.module.css";
import CustomUniverse from "../../components/custom-universe/CustomUniverse";

const Header = (props) => {
	return (
		<header className={classes.header}>
			<Link to="/home">
				<h1>Rick & Morty Fan Page</h1>
			</Link>
			<div className={`${classes.actions} header-actions-block`} data-cy-block={"header-actions"}>
				<Button
					className="bp4-icon-plus bp4-outlined create-universe"
					onClick={props.onAddUniverse}
				>
					Universe
				</Button>
				<Button className={'logout'} onClick={props.onLogout}>
					Logout
				</Button>
			</div>
			{props.isShowModal && (
				<CustomUniverse
					onHideModal={props.onCloseModal}
					modalTitle={props.modalTitle}
					onInputChange={props.onInputChange}
					customUniverseTitle={props.customUniverseTitle}
					onCancelTitle={props.onCancelTitle}
					onSaveTitle={props.onSaveTitle}
					hasCustomUniverseTitleErrorMsg={props.hasCustomUniverseTitleErrorMsg}
				/>
			)}
		</header>
	);
};

export default Header;
