import { useCallback, useState } from "react";

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async (requestConfig, transformData) => {
		// console.log(`custom http sendRequest requestConfig`, requestConfig);

		// reset
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(requestConfig.url, {
				method: requestConfig.method || "GET",
				headers: requestConfig.headers || {},
				body: JSON.stringify(requestConfig.body) || null,
			});

			// console.log(`custom http sendRequest response`, response);

			// fallback
			if (!response.ok) {
				// console.log(`custom http sendRequest error`);
				throw new Error("Something Went Wrong");
			}

			const data = await response.json();

			// console.log(`custom http sendRequest data`, data);

			transformData(data);
		} catch (error) {
			// console.log(`custom http sendRequest catch block -- error`, error);
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	return {
		isLoading,
		error,
		setError,
		sendRequest,
	};
};

export default useHttp;
