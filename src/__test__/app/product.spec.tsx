import Product from "@/app/product/page";
import { render, screen, waitFor } from "@testing-library/react";

describe("Product Page", () => {
  it("should have a loading", () => {
    render(<Product />);
    const element = screen.getByText("loading");
    expect(element).toBeInTheDocument();
  });

  it("should have a heading", async () => {
    await waitFor(() => render(<Product />));
    const element = screen.getByRole("heading", { name: "Product Page" });
  });
});
