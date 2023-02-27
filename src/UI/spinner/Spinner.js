import React, { Fragment } from "react";

import ReactDOM from "react-dom";

import { Spinner as BPSpinner, SpinnerSize } from "@blueprintjs/core";

import classes from "./Spinner.module.css";

const spinnerElement = document.getElementById("spinner-root");

const Spinner = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				(<BPSpinner
					className={classes.spinner}
					intent='primary'
					size={SpinnerSize.LARGE}
          title='Loading...'
				/>),
				spinnerElement
			)}
		</Fragment>
	);
};

export default Spinner;
