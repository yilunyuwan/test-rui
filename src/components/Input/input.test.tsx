import { Input } from "./input";
import { fireEvent, render, screen } from "@testing-library/react";
import Icon from "../Icon/icon";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const defaultProps = {
  onChange: jest.fn(),
  placeholder: "test-input",
};

describe("test Input component", () => {
  it("ender the correct default Input", () => {
    render(<Input {...defaultProps} />);
    const inputNode = screen.getByPlaceholderText(
      "test-input"
    ) as HTMLInputElement;
    expect(inputNode).toBeInTheDocument();
    expect(inputNode).toHaveClass("rui-input");
    fireEvent.change(inputNode, { target: { value: "have changed" } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(inputNode.value).toEqual("have changed");
  });

  it("render the disabled Input", () => {
    render(<Input disabled {...defaultProps} />);
    const inputNode = screen.getByPlaceholderText(
      "test-input"
    ) as HTMLInputElement;
    expect(inputNode).toHaveAttribute("disabled");
    expect(inputNode).toHaveClass("rui-input");
    expect(inputNode).toBeDisabled();
    fireEvent.change(inputNode, { target: { value: "have changed" } });
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it("render different input sizes on size attribute", () => {
    render(
      <div data-testid="wrapper">
        <Input placeholder="size" size="lg" />
      </div>
    );
    const inputWrapper = screen.getByTestId("wrapper").childNodes[0];
    expect(inputWrapper).toBeInTheDocument();
    expect(inputWrapper).toHaveClass("rui-input-wrapper-lg");
  });

  it("render prefix and suffix element", () => {
    const userIcon = <Icon icon={solid("user")} data-testid="userIcon" />;
    const lockIcon = <Icon icon={solid("lock")} data-testid="lockIcon" />;
    render(<Input placeholder="site" prefix={userIcon} suffix={lockIcon} />);
    expect(screen.getByTestId("userIcon")).toBeInTheDocument();
    expect(screen.getByTestId("lockIcon")).toBeInTheDocument();
  });

  it("render prepand and append element", () => {
    render(<Input placeholder="site" prepend="http://" append=".com" />);
    expect(screen.getByText("http://")).toBeInTheDocument();
    expect(screen.getByText(".com")).toBeInTheDocument();
  });
});
