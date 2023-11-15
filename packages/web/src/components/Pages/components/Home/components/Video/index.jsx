/** @format */
import { Box } from "@mui/material";
import ReactPlayer from "react-player";

export default function Video() {
	return (
		<Box sx={{ marginTop: "20px" }}>
			<ReactPlayer
				url="https://www.dropbox.com/s/oxrbxi4b9dwv7yj/AmyCuddy_2012G-480p.mp4?dl=1"
				controls={true}
				width="100%"
				height="400"
			/>
		</Box>
	);
}
