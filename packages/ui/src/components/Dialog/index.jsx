/** @format */

import { useLocales } from "locales";
import { useUI } from "../../";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

const DialogComponent = (props) => {
	const { name, title, children, cancel, confirm } = props;
	const { dialog, dialogs } = useUI();
	const { t } = useLocales();

	return (
		<Dialog open={dialogs.includes(name)} onClose={() => dialog.close(name)}>
			{title && <DialogTitle>{title}</DialogTitle>}
			{children && <DialogContent>{children}</DialogContent>}
			{(confirm || cancel) && (
				<DialogActions>
					{cancel && (
						<Button
							onClick={cancel === true ? () => dialog.close(name) : cancel}
							variant="contained"
							color="error"
						>
							{t("cancel")}
						</Button>
					)}
					{confirm && (
						<Button
							onClick={confirm === true ? () => dialog.close(name) : confirm}
							color="success"
							variant="contained"
							autoFocus
						>
							{t("continue")}
						</Button>
					)}
				</DialogActions>
			)}
		</Dialog>
	);
};

export { DialogComponent as Dialog };

export default DialogComponent;
