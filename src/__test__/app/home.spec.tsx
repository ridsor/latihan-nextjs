import Home from "../../app/page";
import { render, screen } from "@testing-library/react";

describe("Home Page", () => {
  it("should render", () => {
    const view = render(<Home />);
    expect(view).toMatchSnapshot();
  });

  it("should have text", () => {
    render(<Home />);
    const element = screen.getByText(/home page/i);
    expect(element).toBeInTheDocument();
  });
});
