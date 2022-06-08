import React, { useContext } from "react";
import { scopedClass } from "../../helpers/utils";
import classNames from "classnames";
import { TabsContext } from "./tabs";

export interface TabItemProps {
  label: React.ReactNode;
  index?: number;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const TabItem: React.FC<TabItemProps> = (props) => {
  const { label, index, disabled, className, children, ...restProps } = props;
  const context = useContext(TabsContext);
  const handleClick = () => {
    if (!disabled && context.onClick && index !== undefined) {
      context.onClick(index);
    }
  };
  const sc = scopedClass("tabs-nav-item");
  const classes = classNames(className, sc(), {
    [sc("active")]: context.selectedIndex === index && !disabled,
  });
  return (
    <button
      {...restProps}
      role="tab"
      disabled={disabled}
      className={classes}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

TabItem.displayName = "TabItem";

TabItem.defaultProps = {
  disabled: false,
};
