import React, { useState } from "react";

import classes from "./Dropdown.module.css";

import { Select2 } from "@blueprintjs/select";
import { Button } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";

const DropdownSelect = Select2.ofType();

const Dropdown = (props) => {

	const renderSelectedItem = (selectItem, { handleClick, modifiers }) => {
		const text = selectItem.title;
		return (
			<MenuItem2
				active={modifiers.active}
				disabled={modifiers.disabled}
				key={selectItem.id}
				data-item-value={selectItem.key}
				onClick={handleClick}
				text={text}
			/>
		);
	};

	return (
		<div className={classes.dropdown} data-action={"select-universe"}>
			<DropdownSelect
				className={classes["dropdown-select"]}
				filterable={false}
				items={props.items}
				itemRenderer={renderSelectedItem}
				onItemSelect={props.onSelect}
				noResults={<MenuItem2 disabled={true} text="No results." />}
			>
				<Button
					text={props.selectedItemOption.title}
					rightIcon="caret-down"
					data-item-value={props.selectedItemOption.key}
				/>
			</DropdownSelect>
		</div>
	);
};

export default Dropdown;
