import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import { insertSpaceInButton, scopedClass } from "../../helpers/utils";
import { ComponentSize } from "../../helpers/types";

type ButtonType = "primary" | "danger" | "default" | "link";

interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  btnType?: ButtonType;
  size?: ComponentSize;
  /** 链接地址，仅当`btnType`为`"link"`时有效 */
  href?: string;
  disabled?: boolean;
}

export type ButtonProps = Partial<
  BaseButtonProps &
    ButtonHTMLAttributes<HTMLElement> &
    AnchorHTMLAttributes<HTMLElement>
>;
export const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, btnType, size, href, disabled, ...restProps } =
    props;
  const sc = scopedClass("btn");
  const classes = classNames(sc(), className, {
    [sc(btnType)]: btnType,
    [sc(size)]: size,
  });
  const label = insertSpaceInButton(children);
  if (btnType === "link" && href) {
    const disabledProps = disabled
      ? {
          "aria-disabled": true,
          onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            return false;
          },
        }
      : null;
    return (
      <a href={href} className={classes} {...restProps} {...disabledProps}>
        {label}
      </a>
    );
  }
  return (
    <button className={classes} disabled={disabled} {...restProps}>
      {label}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
