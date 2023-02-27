import React from "react";

import { Tab as TabItem, Tabs } from "@blueprintjs/core";

import { FaEdit } from "react-icons/fa";
import Button from "../button/Button";
import classes from "./Tab.module.css";
import Card from "../card/Card";

const Tab = (props) => {
	return (
		<Card>
			<div className={classes.tabs}>
				<Tabs
					id="universe"
					onChange={props.onSelectedTabChange}
					selectedTabId={props.selectedTabId}
				>
					{props.tabs.map((tab) => {
						return (
							<TabItem
								className={classes.tab}
								key={tab.id}
								id={tab.id}
								title={tab.title}
								panel={tab.panel}
							>
								{tab.type === "custom" && (
									<Button
										onClick={props.onEditTitle}
										disabled={tab.id !== props.selectedTabId}
									>
										<FaEdit />
									</Button>
								)}
							</TabItem>
						);
					})}
				</Tabs>
			</div>
		</Card>
	);
};

export default Tab;
