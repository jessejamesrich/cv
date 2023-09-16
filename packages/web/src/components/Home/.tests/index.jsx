/** @format */
import { cleanup, render } from "@testing-library/react";
import { TestContext } from "app";
import Test from "../index.jsx";

// Teardown
afterEach(() => {
	cleanup();
});

it("Bugs renders without crashing.", () => {
	const { container } = render(
		<TestContext>
			<Test />
		</TestContext>
	);
	expect(container).toBeTruthy();
});
