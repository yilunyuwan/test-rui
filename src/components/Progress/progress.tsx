import React from "react";
import { ThemeProps } from "../Icon/icon";
import { scopedClass } from "../../helpers/utils";
import classNames from "classnames";
import { isThemeProps } from "./utils";

export interface ProgressProps {
  percentage: number;
  strokeHeight?: number;
  showText?: boolean;
  style?: React.CSSProperties;
  successColor?: string;
  /**同时支持主题色和CSS颜色值两种格式<br/>
   * 主题色：<code>"primary", "secondary", "success"</code>等<br/>
   * 颜色值：<code>"#F00", "rgb(255,0,0)", "red"</code>等
   * */
  strokeColor?: ThemeProps | string;
  status?: "success" | "exception";
  className?: string;
}

export const Progress: React.FC<ProgressProps> = (props) => {
  const {
    percentage,
    strokeHeight,
    showText,
    style,
    strokeColor,
    successColor,
    status,
    className,
  } = props;
  const sc = scopedClass("progress");
  const processedPercentage =
    percentage > 100
      ? 100
      : percentage < 0
      ? 0
      : Math.round(percentage * 100) / 100;
  const processedColor = () => {
    if (processedPercentage === 100 && successColor) return successColor;
    return isThemeProps(strokeColor) ? undefined : strokeColor;
  };
  return (
    <div
      className={classNames(
        className,
        sc(),
        { [sc("showText")]: showText },
        { [sc(strokeColor)]: isThemeProps(strokeColor) },
        { [sc(`status-${status}`)]: status },
        { [sc(`status-success`)]: processedPercentage === 100 }
      )}
      style={style}
      role="progressbar"
    >
      <div
        className={classNames(sc("outer"))}
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={classNames(sc("inner"))}
          style={{
            width: `${processedPercentage}%`,
            background: processedColor(),
          }}
        />
      </div>
      {showText && (
        <span className={sc("text")}>{`${processedPercentage}%`}</span>
      )}
    </div>
  );
};

Progress.defaultProps = {
  showText: true,
  strokeHeight: 8,
  strokeColor: "primary",
};
