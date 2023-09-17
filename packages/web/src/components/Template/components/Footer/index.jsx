/** @format */

import React from "react";

import { useLocales } from "locales";

import { faGithub, faThreads } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	AppBar,
	Box,
	IconButton,
	Link,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
	styled,
} from "@mui/material";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
	"&": {
		backgroundColor: theme.palette.mode == "light" ? "#FEFEFE" : "#121212",
	},
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
	"&": {
		padding: "0px",
		margin: "0px",
		"*": {
			fontSize: "12px",
		},
	},
}));

const FooterBar = () => {
	const { t } = useLocales();
	return (
		<Box sx={{ position: "fixed", bottom: "0px", width: "100vw" }}>
			<StyledAppBar position="static">
				<Toolbar sx={{ padding: 0 }}>
					<Box>
						<Box
							sx={{
								width: "400px",
								borderRadius: "5px",
								maxWidth: 360,
								bgcolor: "background.paper",
								margin: "20px 0",
							}}
						>
							<nav aria-label="main footer">
								<List>
									<StyledListItem disablePadding>
										<ListItemButton>
											<ListItemIcon>
												<IconButton
													edge="end"
													color="inherit"
													aria-label="GitHub"
													href="https://github.com/your-github-profile"
													target="_blank"
												>
													<FontAwesomeIcon icon={faEnvelope} />
												</IconButton>
											</ListItemIcon>
											<ListItemText primary={t("emailMe")} />
										</ListItemButton>
									</StyledListItem>
									<StyledListItem disablePadding>
										<ListItemButton>
											<ListItemIcon>
												<IconButton
													edge="end"
													color="inherit"
													aria-label="GitHub"
													href="https://github.com/your-github-profile"
													target="_blank"
												>
													<FontAwesomeIcon icon={faGithub} shake />
												</IconButton>
											</ListItemIcon>
											<ListItemText
												primary={
													<Link
														variant="body1"
														color="inherit"
														href="relay@jessejamesrichard.com"
														underline="none"
													>
														{t("download")}
													</Link>
												}
											/>
										</ListItemButton>
									</StyledListItem>
									<StyledListItem disablePadding>
										<ListItemButton>
											<ListItemIcon>
												<IconButton
													edge="end"
													color="inherit"
													aria-label="GitHub"
													href="https://github.com/your-github-profile"
													target="_blank"
												>
													<FontAwesomeIcon icon={faThreads} shake />
												</IconButton>
											</ListItemIcon>
											<ListItemText
												primary={
													<Link
														variant="body1"
														color="inherit"
														href="relay@jessejamesrichard.com"
														underline="none"
													>
														{t("threads")}
													</Link>
												}
											/>
										</ListItemButton>
									</StyledListItem>
								</List>
							</nav>
						</Box>
					</Box>
				</Toolbar>
				<Typography
					variant="body1"
					color="inherit"
					sx={{ padding: "12px", fontSize: "10px", textAlign: "center" }}
				>
					© {new Date().getFullYear()} jessejamesrichard.com (not really)
				</Typography>
			</StyledAppBar>
		</Box>
	);
};

export default FooterBar;
