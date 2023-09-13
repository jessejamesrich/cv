/** @format */
import Context from "..";

// Merge context providers with mock data here if need be.

export default function TestContext(props) {
	return <Context>{props.children || null}</Context>;
}
