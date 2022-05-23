import React, { useState } from "react";
import { scopedClass } from "../../helpers/utils";
import classNames from "classnames";

export type Mode = "horizontal" | "vertical";
export interface MenuProps {
  mode?: Mode;
  defaultIndex?: number;
  onSelect?: (selectedIndex: number) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

interface IMenuContext {
  onClick?: (index: number) => void;
  selectedIndex: number;
  mode: Mode;
}

const defaultProps = {
  mode: "horizontal" as Mode,
  defaultIndex: 0,
};

export const MenuContext = React.createContext<IMenuContext>({
  selectedIndex: defaultProps.defaultIndex,
  mode: defaultProps.mode,
});

export const Menu: React.FC<MenuProps> = (props) => {
  const {
    mode = defaultProps.mode,
    defaultIndex = defaultProps.defaultIndex,
    onSelect,
    children,
    style,
    className,
    ...restProps
  } = props;
  const sc = scopedClass("menu");
  const classes = classNames(className, sc(), sc(mode));
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex || 0);
  const onClick = (index: number) => {
    setSelectedIndex(index);
    if (onSelect) onSelect(index);
  };
  const menuContext: IMenuContext = {
    onClick,
    selectedIndex,
    mode,
  };

  return (
    <MenuContext.Provider value={menuContext}>
      <ul className={classes} {...restProps}>
        {children}
      </ul>
    </MenuContext.Provider>
  );
};

Menu.defaultProps = defaultProps;
