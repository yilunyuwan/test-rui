import Button, { ButtonProps } from "./button";
import { fireEvent, render, screen } from "@testing-library/react";
import { scopedClass } from "../../helpers/utils";

const defaultProps = {
  onClick: jest.fn(),
};

const customProps: ButtonProps = {
  btnType: "primary",
  size: "sm",
  className: "test",
};

const linkProps: ButtonProps = {
  btnType: "link",
  href: "https://www.baidu.com",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

const sc = scopedClass("btn");

describe("test Button component", () => {
  it("should render the correct default button", () => {
    render(<Button {...defaultProps}>Nice</Button>);
    const element = screen.queryByText("Nice") as HTMLElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass(`${sc()} ${sc("default")}`);
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("should render the correct component based on different props", () => {
    render(<Button {...customProps}>Nice</Button>);
    const element = screen.queryByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(`${sc()} ${sc("primary")} ${sc("sm")} test`);
  });

  it("should render a link when btnType equals link and href is provided", () => {
    render(<Button {...linkProps}>Link</Button>);
    const element = screen.queryByText("Link") as HTMLElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass(`${sc()} ${sc("link")}`);
  });

  it("should render disabled button when disabled set to true", () => {
    render(
      <>
        <Button {...disabledProps}>Disabled</Button>
        <Button {...disabledProps} {...linkProps}>
          Disabled Link
        </Button>
      </>
    );
    const disabledButton = screen.queryByText("Disabled") as HTMLElement;
    const disabledLink = screen.queryByText("Disabled Link") as HTMLElement;
    expect(disabledButton).toBeInTheDocument();
    expect(disabledLink).toBeInTheDocument();
    expect(disabledButton).toBeDisabled();
    expect(disabledLink).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(disabledButton);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
    fireEvent.click(disabledLink);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
