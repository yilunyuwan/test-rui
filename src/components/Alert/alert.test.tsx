import { fireEvent, render, screen } from "@testing-library/react";
import Alert, { AlertProps } from "./alert";

const defaultProps: AlertProps = {
  title: "default alert",
};

const customProps: AlertProps = {
  title: "dis-closable success alert",
  description: "with description",
  type: "success",
  closable: false,
};
describe("test Alert component", () => {
  it("render the default closable alert component", () => {
    render(<Alert data-testid="alert" {...defaultProps} />);
    const element = screen.queryByTestId("alert");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("alert alert-default");
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    const closeButton = screen.queryByRole("button", {
      name: "closeButton",
    }) as HTMLElement;
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(closeButton).not.toBeInTheDocument();
  });

  it("render the correct alert based on different props", () => {
    render(<Alert data-testid="alert" {...customProps} />);
    const element = screen.queryByTestId("alert");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("alert alert-success");
    expect(
      screen.getByText(customProps.description as string)
    ).toBeInTheDocument();
    const closeButton = screen.queryByRole("button", { name: "closeButton" });
    expect(closeButton).not.toBeInTheDocument();
  });
});
