import React, { useContext, useState } from "react";
import { MenuContext } from "./menu";
import classNames from "classnames";
import { scopedClass } from "../../helpers/utils";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
import { Transition } from "../Transtition/transition";

export interface SubMenuProps {
  title: string;
  index?: string;
  className?: string;
  children?: React.ReactNode;
}
const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { title, index, className, children, ...restProps } = props;
  const context = useContext(MenuContext);
  const sc_item = scopedClass("menu-item");
  const sc_submenu = scopedClass("submenu");
  const isOpened =
    index === context.selectedIndex ||
    index === context.selectedIndex.split("-")[0] ||
    (context.mode === "vertical" &&
      context.openedIndexes &&
      context.openedIndexes.includes(index as string));
  const [submenuVisible, setSubmenuVisible] = useState<boolean>(isOpened);
  const classes_item = classNames(className, sc_item(), sc_item("submenu"), {
    [sc_item("active")]:
      context.selectedIndex === index ||
      context.selectedIndex.split("-")[0] === index,
    [sc_item("opened")]: submenuVisible,
  });
  const classes_submenu = classNames(sc_submenu());
  let timer: NodeJS.Timeout;
  const toggleVisible = (visible: boolean) => {
    clearTimeout(timer);
    timer = setTimeout(
      () => {
        setSubmenuVisible(visible);
      },
      visible ? 0 : 200
    );
  };
  const hoverEvents =
    context.mode === "horizontal"
      ? {
          onMouseEnter: () => toggleVisible(true),
          onMouseLeave: () => toggleVisible(false),
        }
      : {};
  const clickEvent =
    context.mode === "vertical"
      ? {
          onClick: () => {
            if (!submenuVisible && context.onClick && index !== undefined)
              context.onClick(index);
            setSubmenuVisible(!submenuVisible);
          },
        }
      : {};

  const filterChildren = () =>
    React.Children.map(children, (child, idx) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem")
        return React.cloneElement(childElement, { index: `${index}-${idx}` });
      else
        console.error(
          "Warning: Menu has a child which is not a MenuItem component"
        );
    });

  return (
    <li className={classes_item} {...restProps} {...hoverEvents}>
      <div className={sc_submenu("title")} {...clickEvent}>
        {title}
        <Icon icon="angle-down" />
      </div>
      <Transition in={submenuVisible} timeout={300} animation="zoom-in-top">
        <ul className={classes_submenu}>{filterChildren()}</ul>
      </Transition>
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
