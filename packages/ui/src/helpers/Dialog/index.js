/** @format */

export function openDialog(name) {
	return new Promise((resolve) => {
		this.setState(
			(prevState) => {
				const { dialogs } = prevState;
				if (!dialogs.includes(name)) {
					const updatedDialogs = [...dialogs, name];
					return { dialogs: updatedDialogs };
				}
				return null; // Dialog already open, no state change needed
			},
			() => resolve(true)
		);
	});
}

export function closeDialog(name) {
	return new Promise((resolve) => {
		this.setState((prevState) => {
			const { dialogs } = prevState;
			if (name) {
				// Close a specific dialog by removing it from the array
				const updatedDialogs = dialogs.filter((dialogName) => dialogName !== name);
				return { dialogs: updatedDialogs };
			} else {
				resolve(true);
				// Close all dialogs by clearing the array
				return { dialogs: [] };
			}
		});
	});
}
