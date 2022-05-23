import { fireEvent, render, screen } from "@testing-library/react";
import { Menu, MenuProps, Mode } from "./menu";
import { MenuItem } from "./menuItem";
import { scopedClass } from "../../helpers/utils";

const defaultProps = {
  onSelect: jest.fn(),
  className: "test",
};

const verticalProps = {
  mode: "vertical" as Mode,
  defaultIndex: 2,
};

const generateMenu = (props: MenuProps) => (
  <Menu data-testid="menu" {...props}>
    <MenuItem data-testid="item1" index={0}>
      item1
    </MenuItem>
    <MenuItem disabled={true} data-testid="disabled" index={1}>
      disabled
    </MenuItem>
    <MenuItem data-testid="item3" index={2}>
      item3
    </MenuItem>
  </Menu>
);

let menuElement: HTMLElement,
  activeItem: HTMLElement,
  disabledItem: HTMLElement,
  idleItem: HTMLElement;
const setup = (props: MenuProps) => {
  render(generateMenu(props));
  menuElement = screen.getByTestId("menu");
  activeItem = screen.getByTestId(`item${(props.defaultIndex || 0) + 1}`);
  disabledItem = screen.getByTestId("disabled");
  idleItem = screen.getByTestId(`item${props.defaultIndex ? 1 : 3}`);
};
const sc = scopedClass("menu");

describe("test Menu and MenuItem component in default(horizontal) mode", () => {
  it("render correct Menu and MenuItem based on default props", () => {
    setup(defaultProps);
    expect(menuElement).toHaveClass(`test ${sc()} ${sc("horizontal")}`);
    // eslint-disable-next-line testing-library/no-node-access
    expect(menuElement.getElementsByClassName(`${sc("item")}`).length).toBe(3);
    expect(activeItem).toHaveClass(`${sc("item", "active")}`);
    fireEvent.click(disabledItem);
    expect(defaultProps.onSelect).not.toBeCalled();
  });

  it("click item should change active and call the right callback", () => {
    setup(defaultProps);
    fireEvent.click(idleItem);
    expect(defaultProps.onSelect).toBeCalledWith(2);
    expect(activeItem).not.toHaveClass(sc("item", "active"));
    expect(idleItem).toHaveClass(sc("item", "active"));
  });
});

describe("test Menu and MenuItem component passing customized props (defaultIndex & vertical mode)", () => {
  it("render correct Menu and MenuItem in vertical mode", () => {
    setup(verticalProps);
    expect(menuElement).toHaveClass(`${sc()} ${sc("vertical")}`);
    expect(activeItem).toHaveClass(`${sc("item")} ${sc("item", "active")}`);
    fireEvent.click(disabledItem);
    expect(defaultProps.onSelect).not.toBeCalled();
  });
});
