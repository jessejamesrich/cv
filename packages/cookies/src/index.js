/** @format */

function set(name, value, daysToExpire) {
	const expirationDate = new Date();
	expirationDate.setTime(expirationDate.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
	const expires = `expires=${expirationDate.toUTCString()}`;
	document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function get(name) {
	const cookies = document.cookie.split("; ");
	for (const cookie of cookies) {
		const [cookieName, cookieValue] = cookie.split("=");
		if (cookieName === name) {
			return decodeURIComponent(cookieValue);
		}
	}
	return null; // Cookie not found
}

export { get, set };
