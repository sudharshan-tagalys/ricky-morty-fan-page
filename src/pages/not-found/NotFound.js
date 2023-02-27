import React from "react";

import notFoundImg from "../../assets/404.PNG";

const NotFound = () => {
	return (
		<img
			src={notFoundImg}
			alt="Page Not Found"
			style={{ width: "100vw", height: "90vh" }}
		/>
	);
};

export default NotFound;
