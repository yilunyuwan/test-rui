import React, { useContext, useState } from "react";
import { MenuContext } from "./menu";
import classNames from "classnames";
import { scopedClass } from "../../helpers/utils";
import { MenuItemProps } from "./menuItem";

interface SubMenuProps {
  title: string;
  index?: string;
  className?: string;
  children?: React.ReactNode;
}
export const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { title, index, className, children, ...restProps } = props;
  const context = useContext(MenuContext);
  const sc_item = scopedClass("menu-item");
  const sc_submenu = scopedClass("submenu");
  const isOpened =
    index === context.selectedIndex ||
    (context.mode === "vertical" &&
      context.openedIndexes?.includes(index as string)) ||
    false;

  const [submenuVisible, setSubmenuVisible] = useState<Boolean>(isOpened);
  const classes_item = classNames(className, sc_item(), sc_item("submenu"), {
    [sc_item("active")]: context.selectedIndex === index,
  });
  const classes_submenu = classNames(sc_submenu(), {
    [sc_submenu("opened")]: submenuVisible,
  });
  let timer: NodeJS.Timeout;
  const toggleVisible = (visible: Boolean) => {
    clearTimeout(timer);
    timer = setTimeout(
      () => {
        setSubmenuVisible(visible);
      },
      visible ? 0 : 300
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
          onClick: () => setSubmenuVisible(!submenuVisible),
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
      </div>
      <ul className={classes_submenu}>{filterChildren()}</ul>
    </li>
  );
};

SubMenu.displayName = "SubMenu";
