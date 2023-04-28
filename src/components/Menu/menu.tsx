import React, { useState } from "react";
import { scopedClass } from "../../helpers/utils";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

export type Mode = "horizontal" | "vertical";
export interface MenuProps {
  mode?: Mode;
  /** 默认激活的菜单索引值 */
  defaultIndex?: string;
  /** 点击菜单项触发的回调函数 */
  onSelect?: (selectedIndex: string) => void;
  /** 默认开启的子菜单的索引值数组,仅当`mode`为`"vertical"时有效` */
  openedIndexes?: string[];
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

interface IMenuContext {
  onClick?: (index: string) => void;
  selectedIndex: string;
  mode: Mode;
  openedIndexes: string[];
}

const defaultProps: Required<
  Pick<MenuProps, "mode" | "defaultIndex" | "openedIndexes">
> = {
  mode: "horizontal",
  defaultIndex: "0",
  openedIndexes: [],
};

export const MenuContext = React.createContext<IMenuContext>({
  selectedIndex: defaultProps.defaultIndex,
  mode: defaultProps.mode,
  openedIndexes: defaultProps.openedIndexes,
});

const Menu: React.FC<MenuProps> = (props) => {
  const {
    mode = defaultProps.mode,
    defaultIndex = defaultProps.defaultIndex,
    onSelect,
    openedIndexes = defaultProps.openedIndexes,
    children,
    style,
    className,
    ...restProps
  } = props;
  const sc = scopedClass("menu");
  const classes = classNames(className, sc(), sc(mode));
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex || "0");
  const onClick = (index: string) => {
    setSelectedIndex(index);
    if (onSelect) onSelect(index);
  };
  const menuContext: IMenuContext = {
    onClick,
    selectedIndex,
    mode,
    openedIndexes,
  };

  const filterChildren = () =>
    React.Children.map(children, (child, index) => {
      if (typeof child !== "object") {
        console.error(
          "Warning: Menu has a child which is not a MenuItem or SubMenu component"
        );
        return;
      }
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu")
        return React.cloneElement(childElement, { index: String(index) });
      else
        console.error(
          "Warning: Menu has a child which is not a MenuItem or SubMenu component"
        );
    });

  return (
    <MenuContext.Provider value={menuContext}>
      <ul className={classes} {...restProps}>
        {filterChildren()}
      </ul>
    </MenuContext.Provider>
  );
};

Menu.defaultProps = defaultProps;
export default Menu;
