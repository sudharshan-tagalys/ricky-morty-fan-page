import React from "react";

import classes from "./Pagination.module.css";

const Pagination = (props) => {
	// fallback
	if (!(props.totalPagesCount > props.itemsPerPage)) {
		console.log(`inside pagination fall back, (props.totalPagesCount > props.itemsPerPage)`, (props.totalPagesCount > props.itemsPerPage));
		return;
	}

	let totalPages = Math.ceil(props.totalPagesCount / props.itemsPerPage);
	let pages = [];

	console.log(`pages ${pages}`);

	for (let i = 1; i <= totalPages; i++) {
		pages.push(i);
		console.log(`pages ${pages}`);
	}

	console.log(
		`props.activePage ${props.activePage}, pages[0]:${
			pages[0]
		} pages[pages.length - 1]: ${pages[pages.length - 1]}`
	);

	return (
		<ul className={classes["pagination-container"]}>
			<li>
				<button
					className={
						props.activePage === pages[0]
							? classes["pagination-link-disabled"]
							: ""
					}
					onClick={props.onPageNoChange}
					value="previous"
					data-cy-pagination={'previous'}
				>
					Previous
				</button>
			</li>
			{pages.map((pageNo) => {
				return (
					<li id={pageNo} key={pageNo}>
						<button
							className={props.activePage === pageNo ? classes["pagination-link-active"]: ''}
							onClick={props.onPageNoChange}
							value={pageNo}
						>
							{pageNo}
						</button>
					</li>
				);
			})}
			<li>
				<button
					className={
						props.activePage === pages[pages.length - 1]
							? classes["pagination-link-disabled"]
							: ""
					}
					onClick={props.onPageNoChange}
					value="next"
					data-cy-pagination={'next'}
				>
					Next
				</button>
			</li>
		</ul>
	);
};

export default Pagination;
