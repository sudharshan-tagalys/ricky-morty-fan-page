import React from "react";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import Modal from "../../UI/modal/Modal";
import classes from "./CustomUniverse.module.css";

const customUniverseInputConfig = {
	type: "text",
	id: "custom-universe",
	value: "",
	placeholder: "Enter Custom Universe Title",
};

const CustomUniverse = (props) => {
	return (
		<Modal onCloseBackdrop={props.onHideModal}>
			<div className={classes["modal-header"]}>
				<h3>{props.modalTitle}</h3>
			</div>
			<div className={classes["modal-content"]} data-block={"new-universe-input"}>
				<Input
					inputConfig={{
						...customUniverseInputConfig,
						onChangeHandler: props.onInputChange,
						value: props.customUniverseTitle,
					}}
					className={"new-universe-name"}
				/>
				{props.hasCustomUniverseTitleErrorMsg && (
					<h6 style={{ color: "red" }}>
						{props.hasCustomUniverseTitleErrorMsg}
					</h6>
				)}
			</div>
			<div className={classes["modal-actions"]} ata-cy-block={"new-universe-actions"}>
				<Button className="bp4-outlined" onClick={props.onCancelTitle}>
					Cancel
				</Button>
				<Button className="bp4-outlined" onClick={props.onSaveTitle}>
					Save
				</Button>
			</div>
		</Modal>
	);
};

export default CustomUniverse;
