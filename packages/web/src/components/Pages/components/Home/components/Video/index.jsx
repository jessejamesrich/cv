/** @format */
import { Box } from "@mui/material";
import ReactPlayer from "react-player";
import ShortVideo from "./assets/videos/short-video.mp4";

export default function Video({ playing }) {
	return (
		<Box
			sx={{
				marginTop: "20px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<ReactPlayer
				playing={playing}
				url={ShortVideo}
				controls={true}
				width="80%"
				height="300"
				onEnded={() => setSeeMore(true)}
			/>
		</Box>
	);
}
