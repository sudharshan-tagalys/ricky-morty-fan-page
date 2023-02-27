import React, { Fragment } from "react";

import { Dialog as BPDialog } from "@blueprintjs/core";
import Button from "../button/Button";
import classes from "./Dialog.module.css";

const portalElement = document.getElementById("overlays");

const Dialog = (props) => {
	console.log(`inside dailog component -- props `, props);
	return (
		<BPDialog
			isOpen={props.dialogConfig.isDialogOpen}
			backdropClassName={classes.backdrop}
			canEscapeKeyClose={false}
			canOutsideClickClose={true}
			lazy={true}
			onClose={props.dialogConfig.onCloseDialog}
			usePortal={true}
			portalContainer={portalElement}
			title={props.dialogConfig.title}
      className={classes.dialog}
			children={
				<Fragment>
					<p>{props.dialogConfig.description}</p>
					{props.dialogConfig.dialogBtnList.map((btn) => {
						return (
							<Button key={btn.title} value={btn.title} onClick={btn.onClick}>
								{btn.title}
							</Button>
						);
					})}
				</Fragment>
			}
		></BPDialog>
	);
};

export default Dialog;
