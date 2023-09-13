/** @format */
import { render } from "@testing-library/react";
import Test from "../index.jsx";

describe("web/home", () => {
	it("renders without crashing", () => {
		const { container } = render(<Test />);
		expect(container).toBeTruthy();
	});
});
