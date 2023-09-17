/** @format */

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import React, { useEffect, useRef, useState } from "react";

function PopperMenu() {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	// Ref for the popper element
	const popperRef = useRef(null);

	// Click-away handler
	const handleOutsideClick = (event) => {
		if (popperRef.current && !popperRef.current.contains(event.target)) {
			handleClose();
		}
	};

	// Attach click-away listener when the menu is open
	useEffect(() => {
		if (open) {
			document.addEventListener("mousedown", handleOutsideClick);
		} else {
			document.removeEventListener("mousedown", handleOutsideClick);
		}

		// Clean up the listener when the component unmounts
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [open]);

	return (
		<div ref={popperRef}>
			<Button aria-controls={open ? "menu-list" : undefined} aria-haspopup="true" onClick={handleClick}>
				Open Menu
			</Button>
			<Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition>
				{({ TransitionProps }) => (
					<Paper>
						<MenuList id="menu-list">
							<MenuItem onClick={handleClose}>Item 1</MenuItem>
							<MenuItem onClick={handleClose}>Item 2</MenuItem>
							<MenuItem onClick={handleClose}>Item 3</MenuItem>
						</MenuList>
					</Paper>
				)}
			</Popper>
		</div>
	);
}

export default PopperMenu;
