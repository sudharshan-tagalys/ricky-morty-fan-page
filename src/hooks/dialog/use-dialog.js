import  { useCallback, useState } from "react";

const UseDialog = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	// console.log(`inside useDialog`, isDialogOpen);
	const openDialogHandler = useCallback(() => {
		// console.log(`inside openDialogHandler useDialog`, isDialogOpen);
		setIsDialogOpen(true);
	}, []);

	const closeDialogHandler = () => {
		// console.log(`inside closeDialogHandler useDialog`, isDialogOpen);
		setIsDialogOpen(false);
	};

	return { isDialogOpen, openDialogHandler, closeDialogHandler };
};

export default UseDialog;
