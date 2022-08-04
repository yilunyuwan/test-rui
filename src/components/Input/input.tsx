import React, {
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import classNames from "classnames";
import { scopedClass } from "../../helpers/utils";
import { ComponentSize } from "../../helpers/types";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size" | "prefix"> {
  disabled?: boolean;
  size?: ComponentSize;
  prefix?: React.ReactElement | string;
  suffix?: React.ReactElement | string;
  prepend?: React.ReactElement | string;
  append?: React.ReactElement | string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    disabled,
    size,
    prefix,
    suffix,
    prepend,
    append,
    className,
    style,
    onChange,
    ...restProps
  } = props;
  const filteredChange = disabled ? () => {} : onChange;
  const sc = scopedClass("input");
  const wrapperClasses = classNames(className, sc("wrapper"), {
    [sc("wrapper", size)]: size,
  });
  const affixClasses = classNames(sc("affix-wrapper"), {
    [sc("has-prepend")]: prepend,
    [sc("has-append")]: append,
  });
  return (
    <span
      ref={ref}
      className={wrapperClasses}
      tabIndex={disabled ? -1 : 0}
      style={style}
    >
      {prepend ? (
        <span className={classNames(sc("addon"), sc("prepend"))}>
          {prepend}
        </span>
      ) : null}
      <span className={affixClasses} aria-disabled={disabled}>
        {prefix ? <span className={sc("prefix")}>{prefix}</span> : null}
        <input
          disabled={disabled}
          className={sc()}
          onChange={filteredChange}
          {...restProps}
        />
        {suffix ? <span className={sc("suffix")}>{suffix}</span> : null}
      </span>
      {append ? (
        <span className={classNames(sc("addon"), sc("append"))}>{append}</span>
      ) : null}
    </span>
  );
});

Input.defaultProps = {
  disabled: false,
};
