import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const sc_arrowIcon = scopedClass("submenu-arrowIcon");
  const isOpened =
    context.mode === "vertical" &&
    context.openedIndexes &&
    context.openedIndexes.includes(index as string);
  const [submenuVisible, setSubmenuVisible] = useState<boolean>(isOpened);

  const classes_item = classNames(className, sc_item(), sc_item("submenu"), {
    [sc_item("active")]:
      context.selectedIndex === index ||
      context.selectedIndex.split("-")[0] === index,
  });
  const classes_submenu = classNames(sc_submenu());
  const classes_arrowIcon = classNames(sc_arrowIcon(), {
    [sc_arrowIcon("up")]: submenuVisible,
  });
  let timerRef = useRef<NodeJS.Timeout | null>(null);
  const toggleVisible = useCallback((visible: boolean) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => {
        setSubmenuVisible(visible);
      },
      visible ? 0 : 200
    );
  }, []);
  useEffect(() => {
    if (
      context.mode === "horizontal" &&
      context.selectedIndex.split("-")[0] === index
    )
      toggleVisible(false);
  }, [context, index, toggleVisible]);
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
        <Icon icon="angle-down" className={classes_arrowIcon} />
      </div>
      <Transition in={submenuVisible} timeout={300} animation="zoom-in-top">
        <ul className={classes_submenu}>{filterChildren()}</ul>
      </Transition>
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
