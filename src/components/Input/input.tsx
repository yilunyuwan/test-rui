import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";
import { scopedClass } from "../../helpers/utils";

type InputSize = "lg" | "sm";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size" | "prefix"> {
  disabled?: boolean;
  size?: InputSize;
  prefix?: React.ReactElement | string;
  suffix?: React.ReactElement | string;
  prepend?: React.ReactElement | string;
  append?: React.ReactElement | string;
  className?: string;
}

export const Input: React.FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    prefix,
    suffix,
    prepend,
    append,
    className,
    style,
    ...restProps
  } = props;
  const sc = scopedClass("input");
  const wrapperClasses = classNames(className, sc("wrapper"), {
    [sc("wrapper", size || "")]: size,
  });
  const affixClasses = classNames(sc("affix-wrapper"), {
    [sc("has-prepend")]: prepend,
    [sc("has-append")]: append,
  });
  return (
    <span
      className={wrapperClasses}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      style={style}
    >
      {prepend ? (
        <span className={classNames(sc("addon"), sc("prepend"))}>
          {prepend}
        </span>
      ) : null}
      <label className={affixClasses}>
        {prefix ? <span className={sc("prefix")}>{prefix}</span> : null}
        <input disabled={disabled} className={sc()} {...restProps} />
        {suffix ? <span className={sc("suffix")}>{suffix}</span> : null}
      </label>
      {append ? (
        <span className={classNames(sc("addon"), sc("append"))}>{append}</span>
      ) : null}
    </span>
  );
};

Input.defaultProps = {};
