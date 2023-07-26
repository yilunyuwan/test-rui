import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Menu, { MenuProps, Mode } from "./menu";
import MenuItem from "./menuItem";
import { scopedClass } from "../../helpers/utils";
import SubMenu from "./subMenu";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleDown);

const defaultProps = {
  onSelect: jest.fn(),
  className: "test",
};

const verticalProps = {
  mode: "vertical" as Mode,
  defaultIndex: "2",
  onSelect: jest.fn(),
  openedIndexes: ["4"],
};

const generateMenu = (props: MenuProps) => (
  <Menu data-testid="menu" {...props}>
    <MenuItem data-testid="item1">item1</MenuItem>
    <MenuItem disabled data-testid="disabled">
      disabled
    </MenuItem>
    <MenuItem data-testid="item3">item3</MenuItem>
    {/*测试是否只接受MenuItem为子元素*/}
    {/*<li>item li</li>*/}
    <SubMenu title="dropdown">
      <MenuItem>drop1</MenuItem>
      <MenuItem>drop2</MenuItem>
    </SubMenu>
    <SubMenu title="openedSubmenu">
      <MenuItem>drop3</MenuItem>
      <MenuItem>drop4</MenuItem>
    </SubMenu>
  </Menu>
);

const generateStyleFile = () => {
  const style = document.createElement("style");
  style.innerHTML = `
    .rui-submenu {
      display: none;
    }
    .rui-submenu-opened {
      display: block;
     }
  `;
  return style;
};

let menuElement: HTMLElement,
  activeItem: HTMLElement,
  disabledItem: HTMLElement,
  idleItem: HTMLElement;

const setup = (props: MenuProps) => {
  render(generateMenu(props));
  menuElement = screen.getByTestId("menu");
  activeItem = screen.getByTestId(
    `item${Number(props.defaultIndex || "0") + 1}`
  );
  disabledItem = screen.getByTestId("disabled");
  idleItem = screen.getByTestId(`item${props.defaultIndex ? 1 : 3}`);
};
const sc = scopedClass("menu");

describe("test Menu and MenuItem component in default(horizontal) mode", () => {
  it("render correct Menu and MenuItem based on default props", () => {
    setup(defaultProps);
    expect(menuElement).toHaveClass(`test ${sc()} ${sc("horizontal")}`);
    // eslint-disable-next-line testing-library/no-node-access
    expect(menuElement.querySelectorAll(":scope > li").length).toBe(5);
    expect(activeItem).toHaveClass(`${sc("item", "active")}`);
    fireEvent.click(disabledItem);
    expect(defaultProps.onSelect).not.toBeCalled();
  });

  it("click item should change active and call the right callback", () => {
    setup(defaultProps);
    fireEvent.click(idleItem);
    expect(defaultProps.onSelect).toBeCalledWith("2");
    expect(activeItem).not.toHaveClass(sc("item", "active"));
    expect(idleItem).toHaveClass(sc("item", "active"));
  });

  it("show dropdown items when mouse entering and hide them when mouse leaving", async () => {
    setup(defaultProps);
    document.body.appendChild(generateStyleFile());
    const submenuTitle = screen.getByText("dropdown");
    expect(screen.queryByText("drop2")).not.toBeInTheDocument();
    fireEvent.mouseEnter(submenuTitle);
    const drop2 = await screen.findByText("drop2");
    expect(drop2).toBeInTheDocument();
    fireEvent.click(drop2);
    expect(defaultProps.onSelect).toBeCalledWith("3-1");
    fireEvent.mouseLeave(submenuTitle);
    await waitFor(() =>
      expect(screen.queryByText("drop2")).not.toBeInTheDocument()
    );
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

  it("render opened submenu when passing proper openedIndexes & toggle submenu when clicking the title of submenu", async () => {
    setup(verticalProps);
    document.body.appendChild(generateStyleFile());
    const submenuTitle = screen.getByText("openedSubmenu");
    const drop3 = await screen.findByText("drop3");
    expect(drop3).toBeInTheDocument();
    fireEvent.click(submenuTitle);
    await waitFor(() => expect(drop3).not.toBeInTheDocument());
    fireEvent.click(submenuTitle);
    expect(await screen.findByText("drop3")).toBeInTheDocument();
  });

  it("call onSelect function when click item in submenu", () => {
    setup(verticalProps);
    const drop3 = screen.getByText("drop3");
    fireEvent.click(drop3);
    expect(verticalProps.onSelect).toBeCalledWith("4-0");
  });
});
