import React, { useContext } from "react";
import { scopedClass } from "../../helpers/utils";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  disabled?: Boolean;
  index?: string;
  children?: React.ReactNode;
  className?: string;
}
export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { disabled, children, className, index, ...restProps } = props;
  const sc = scopedClass("menu-item");
  const context = useContext(MenuContext);
  const classes = classNames(sc(), className, {
    [sc("disabled")]: disabled,
    [sc("active")]: context.selectedIndex === index,
  });
  const handleClick = () => {
    if (!disabled && context.onClick && index !== undefined)
      context.onClick(index);
  };
  return (
    <li className={classes} onClick={handleClick} {...restProps}>
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";
