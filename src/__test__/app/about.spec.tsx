import AboutPage from "../../app/about/page";
import { render } from "@testing-library/react";

describe("About Page", () => {
  it("should render", () => {
    const view = render(<AboutPage />);
    expect(view).toMatchSnapshot();
  });
});
