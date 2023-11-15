/** @format */

import { build, show } from "./config";

const version = import.meta.env.VITE_VERSION;
const environment = import.meta.env.MODE;
const localhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

if (import.meta.env.MODE == "development") {
	if (show.development) console.log(`Running v${version} (${build}) in ${environment} mode.`);
} else {
	if (show.production) console.log(`Running v${version} (${build}) in ${environment} mode.`);
}

if (localhost && show.development) console.log("Running on localhost. Some features will be disabled.");

export default version;

export { build, build as dist, environment, localhost, show, version };
