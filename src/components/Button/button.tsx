import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import classNames from "classnames";

type ButtonType = "primary" | "danger" | "default" | "link";
type ButtonSize = "lg" | "sm";

interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  btnType?: ButtonType;
  size?: ButtonSize;
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
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
  });
  if (btnType === "link" && href) {
    const disabledProps = disabled
      ? {
          "aria-disabled": true,
          onClick: () => {
            return false;
          },
        }
      : null;
    return (
      <a href={href} className={classes} {...restProps} {...disabledProps}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
