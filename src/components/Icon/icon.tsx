import React from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { scopedClass } from "../../helpers/utils";
import classNames from "classnames";

type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}
export const Icon: React.FC<IconProps> = (props) => {
  const { theme, className, ...restProps } = props;
  const sc = scopedClass("icon");
  const classes = classNames(className, sc(), {
    [sc(theme)]: theme,
  });
  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
