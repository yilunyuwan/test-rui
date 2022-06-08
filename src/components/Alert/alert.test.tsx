import { fireEvent, render, screen } from "@testing-library/react";
import Alert, { AlertProps } from "./alert";
import { scopedClass } from "../../helpers/utils";

const defaultProps: AlertProps = {
  title: "default alert",
};

const customProps: AlertProps = {
  title: "dis-closable success alert",
  description: "with description",
  type: "success",
  closable: false,
};

const sc = scopedClass("alert");
describe("test Alert component", () => {
  it("render the default closable alert component", async () => {
    render(<Alert data-testid="alert" {...defaultProps} />);
    const element = screen.queryByTestId("alert");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(`${sc()} ${sc("default")}`);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    const closeButton = screen.queryByRole("button", {
      name: "closeButton",
    }) as HTMLElement;
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    await (() => expect(element).not.toBeInTheDocument());
  });

  it("render the correct alert based on different props", () => {
    render(<Alert data-testid="alert" {...customProps} />);
    const element = screen.queryByTestId("alert");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(`${sc()} ${sc("success")}`);
    expect(
      screen.getByText(customProps.description as string)
    ).toBeInTheDocument();
    const closeButton = screen.queryByRole("button", { name: "closeButton" });
    expect(closeButton).not.toBeInTheDocument();
  });
});
