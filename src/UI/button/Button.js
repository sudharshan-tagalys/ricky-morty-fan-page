import React from "react";
import { Button as BPButton } from "@blueprintjs/core";
import classes from "./Button.module.css";

const Button = (props) => {
	return (
		<BPButton
			type={props.type || "button"}
			className={`${classes.button} ${props.className} bp4-button`}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.children}
		</BPButton>
	);
};

export default Button;
