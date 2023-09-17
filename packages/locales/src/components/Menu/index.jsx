/** @format */

import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Box from "@mui/system/Box";
import React, { useRef, useState } from "react";

import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useLocales } from "locales";

import locales from "../../config";

export default function Menu(props) {
	const { set } = useLocales();
	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setOpen(false);
	};

	const enabledLocales = locales.supported.filter((locale) => locale.enabled && locale.visible);

	return (
		<Box {...props}>
			<Button
				ref={anchorRef}
				aria-controls={open ? "composition-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
				sx={{ color: props?.sx.color || "#121212", minHeight: "32px" }}
			>
				<FontAwesomeIcon icon={faLanguage} />
			</Button>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				placement="bottom-start"
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									autoFocusItem={open}
									id="composition-menu"
									onKeyDown={(e) => {
										if (e.key === "Escape") {
											handleClose(e);
										}
									}}
								>
									{enabledLocales.map((locale) => (
										<MenuItem
											key={locale.code}
											onClick={(event) => {
												set(locale.code);
												handleClose(event);
											}}
										>
											{locale.name}
										</MenuItem>
									))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</Box>
	);
}
