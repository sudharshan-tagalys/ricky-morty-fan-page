import React from "react";

import { RadioGroup } from "@blueprintjs/core";

import classes from "./Input.module.css";

const searchInput = (searchInputConfig) => {
	return (
		<div className={classes["search-container"]}>
			<span className="bp4-icon bp4-icon-search"></span>
			<input
				id={searchInputConfig.id}
				className="bp4-input"
				type="search"
				value={searchInputConfig.value}
				placeholder={searchInputConfig.placeholder}
				onChange={searchInputConfig.onChangeHandler}
				dir="auto"
				data-input={"search"}
			/>
		</div>
	);
};

const radioInput = (radioInputConfig) => {
	const {
		id = "",
		className = "",
		label = "",
		options = null,
		selectedValue = "",
		onChangeHandler,
	} = radioInputConfig;

	return (
		<div className={classes.radio} data-action={"radio-group"}>
			<RadioGroup
				id={id}
				className={`docs-radio-regular ${className}`}
				inline={true}
				options={options}
				onChange={onChangeHandler}
				selectedValue={selectedValue}
			></RadioGroup>
		</div>
	);
};

const textInput = (textInputConfig) => {
	const {
		id = "",
		className = "",
		value = "",
		placeholder = "",
		onChangeHandler,
	} = textInputConfig;

	return (
		<div>
			<input
				id={id}
				className={`bp4-input ${className}`}
				type="text"
				placeholder={placeholder}
				onChange={onChangeHandler}
				value={value}
				dir="auto"
			/>
		</div>
	);
};

const inputList = {
	search: searchInput,
	radio: radioInput,
	text: textInput,
};

const Input = (props) => {
	let InputContent = inputList[props.inputConfig.type];
	// console.log(props);
	// console.log(inputList[props.inputConfig.type]);
	// console.log(InputContent);
	// console.log(<InputContent {...props} />);
	// console.log(<InputContent {...props.inputConfig} />);
	// inputContent = inputContent.bind(null, props.inputConfig);

	return (
		<div className={classes["input-container"]}>
			{/* InputContent() */}
			<InputContent {...props.inputConfig} />
		</div>
	);
};

export default Input;
