/** @format */
import { Box, Button, Divider } from "@mui/material";
import Cookies from "js-cookie";
import { useLocales } from "locales";
import { useEffect, useState } from "react";
import Typewriter from "react-ts-typewriter";

// Get the video
import Video from "@Blocks/Video";

export default function Home() {
	// show the continue buttons when showVideo
	const [finishedText, setFinishedText] = useState(false);

	// Show the video when showVideo
	const [showVideo, setShowVideo] = useState(false);

	// Set playing only when they're a first time user
	const [playing, setPlaying] = useState(true);

	// impor the localization complonent
	const { t } = useLocales();

	// Check if the cookie exists when the component mounts
	useEffect(() => {
		// Check the cookie
		const hasSeenVideo = Cookies.get("hasSeenVideo");

		// If they're already seen the video, show it but don't play it
		if (hasSeenVideo) {
			// Don't play it
			setPlaying(false);

			// Hde the finished text
			setFinishedText(true);

			// Show the non-play video
			setShowVideo(true);
		}
	}, []);

	// Function to handle video completion
	const handleVideoCompletion = () => {
		// Show the final text and next button
		setFinishedText(true);

		// Save the user some grief by now showing it again (or 5 minutes)
		Cookies.set("hasSeenVideo", "true", { expires: 5 / 1440 });
	};

	return (
		<>
			{!showVideo ? (
				<Box sx={{ "> span": { fontSize: "24px" } }}>
					{!finishedText ? (
						<Typewriter
							text={t("videoIntro")}
							speed={10}
							onFinished={() => setTimeout(() => handleVideoCompletion(true), 500)}
						/>
					) : (
						<Box component="span">{t("videoIntro")}</Box>
					)}
					<Box
						sx={{
							marginTop: 5,
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						{!finishedText ? (
							<Button color="error" variant="contained" size="large" onClick={() => setFinishedText(true)}>
								{t("skip")}
							</Button>
						) : (
							<Button color="success" variant="contained" onClick={() => setShowVideo(true)} size="large">
								{t("lemmeSee")}
							</Button>
						)}
					</Box>
				</Box>
			) : (
				<>
					<Video playing={playing} />
					<Divider sx={{ margin: "5%" }} />
					<Box sx={{ padding: "0 5%" }}>{t("videoIntro")}</Box>
				</>
			)}
		</>
	);
}
