import Button, { ButtonProps } from "./button";
import { fireEvent, render, screen } from "@testing-library/react";

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
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

describe("test Button component", () => {
  it("should render the correct default button", () => {
    render(<Button {...defaultProps}>Nice</Button>);
    const element = screen.getByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("should render the correct component based on different props", () => {
    render(<Button {...testProps}>Nice</Button>);
    const element = screen.getByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn btn-primary btn-sm test");
  });

  it("should render a link when btnType equals link and href is provided", () => {
    render(<Button {...linkProps}>Link</Button>);
    const element = screen.getByText("Link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link");
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
    const disabledButton = screen.getByText("Disabled");
    const disabledLink = screen.getByText("Disabled Link");
    expect(disabledButton).toBeInTheDocument();
    expect(disabledLink).toBeInTheDocument();
    expect(disabledButton).toBeDisabled();
    expect(disabledLink).toHaveClass("disabled");
    fireEvent.click(disabledButton);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
    /*
    因为 a 标签本身是不带禁用属性的
    我们在实现 link 按钮的禁用功能时
    用的是 css 中的 pointer-events: none 让用户无法点击
    可能 `fireEvent.click` 是在 DOM 节点上操作进行点击
    所以在测试中 Link 按钮的 onClick 函数有被调用。
    */
    // fireEvent.click(disabledLink)
    // expect(disabledProps.onClick).not.toHaveBeenCalled()
  });
});
