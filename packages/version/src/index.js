/** @format */

const version = import.meta.env.VITE_VERSION;

if (import.meta.env.MODE == "development") {
  console.log(`Running v${version} in ${import.meta.env.MODE} mode.`);
} else {
  // Remove this when ready
  console.log(`Running v${version}in ${import.meta.env.MODE} mode.`);
}

export default version;
