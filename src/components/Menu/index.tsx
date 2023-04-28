import React from "react";
import Menu, { MenuProps } from "./menu";
import MenuItem, { MenuItemProps } from "./menuItem";
import SubMenu, { SubMenuProps } from "./subMenu";

type CompoundedMenuProps = React.FC<MenuProps> & {
  Item: React.FC<MenuItemProps>;
  SubMenu: React.FC<SubMenuProps>;
};

const CompoundedMenu = Menu as CompoundedMenuProps;

CompoundedMenu.Item = MenuItem;
CompoundedMenu.SubMenu = SubMenu;

export default CompoundedMenu;
