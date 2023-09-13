/** @format */
import { render } from "@testing-library/react";
import { TestContext } from "locales";
import Test from "../index.jsx";

describe("web/home", () => {
	it("renders without crashing", () => {
		const { container } = render(
			<TestContext>
				<Test />
			</TestContext>
		);
		expect(container).toBeTruthy();
	});
});
