import React, { useState } from "react";

import ReactPaginate from "react-paginate";

import classes from "./Pagination.module.css";

const Pagination = (props) => {
	// console.log(`L2 -- inside Pagination Component`)
	const [pageNumber, setPageNumber] = useState(0);
	
	const { data, itemsPerPage } = props.data;

	// setPageNumber(initialPageNumber);
	// console.log(`pageNumber`, pageNumber)

	const dataCount = Math.ceil(data.length / itemsPerPage);
	const startIndex = pageNumber * itemsPerPage;
	let endIndex = (startIndex + itemsPerPage);
  endIndex = (endIndex < data.length) ? endIndex : data.length;

	const disablePrevLinkClass =
		pageNumber === 0 ? "pagination-link-disabled" : "";
	const disableNextLinkClass =
		pageNumber === dataCount ? "pagination-link-disabled" : "";

	// console.log(
	// 	`dataCount: ${dataCount}, startIndex: ${startIndex}, 
  //    endIndex: ${endIndex},  disablePrevLinkClass: ${disablePrevLinkClass}
  //    disableNextLinkClass: ${disableNextLinkClass}`
	// );

	const changePageNumberHandler = (event) => {
		console.log(`inisde changePageNumberHandler`, event);
		setPageNumber(event.selected);
	};

	props.onPageNumberChange({ startIndex, endIndex });

	return (
		<ReactPaginate
			previousLabel={"Previous"}
			nextLabel={"Next"}
			pageCount={dataCount}
			onPageChange={changePageNumberHandler}
      containerClassName={classes['pagination-container']}     
      activeClassName={classes['pagination-link-active']}
      disabledLinkClassName={classes['pagination-link-disabled']}
		/>
	);
};

export default Pagination;
