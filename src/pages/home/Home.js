import React, { Fragment } from "react";
import Spinner from "../../UI/spinner/Spinner";
import Tab from "../../UI/tab/Tab";
import classes from "./Home.module.css";
import Dialog from "../../UI/dialog/Dialog";

const Home = (props) => {
	return (
		<Fragment>
			{props.isLoading && <Spinner />}
			{props.dialogConfig.isDialogOpen && (
				<Dialog dialogConfig={props.dialogConfig} />
			)}
			<div className={classes["tab-container"]}>
				<Tab
					tabs={props.tabs}
					onSelectedTabChange={props.onSelectedTabChange}
					selectedTabId={props.selectedTabId}
					onEditTitle={props.onEditTitle}
				/>
			</div>
		</Fragment>
	);
};

export default Home;
