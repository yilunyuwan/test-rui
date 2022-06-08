import React, { MouseEventHandler, useState } from "react";
import classnames from "classnames";
import { scopedClass } from "../../helpers/utils";
import Icon from "../Icon/icon";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Transition } from "../Transtition/transition";

type AlertType = "default" | "success" | "danger" | "warning";

export interface AlertProps {
  /** 是否显示关闭按钮 */
  closable?: boolean;
  type?: AlertType;
  title: string;
  /** 辅助描述 */
  description?: string;
  className?: string;
  /** 关闭警告后触发的回调函数 */
  onClose?: MouseEventHandler;
}
export const Alert: React.FC<AlertProps> = (props) => {
  const {
    closable,
    type,
    title,
    description,
    className,
    onClose,
    ...restProps
  } = props;
  const sc = scopedClass("alert");
  const classes = classnames(className, sc(), { [sc(type)]: true });
  const [visible, setVisible] = useState(true);
  const handleClose: MouseEventHandler = (e) => {
    setVisible(false);
    if (onClose) onClose(e);
  };
  return (
    <Transition in={visible} timeout={300} animation="zoom-in-top">
      <div className={classes} {...restProps}>
        <div className={sc("content")}>
          <header className={sc("title")}>{title}</header>
          {description && (
            <div className={sc("description")}>{description}</div>
          )}
        </div>

        {closable && (
          <span
            className={sc("close")}
            role="button"
            aria-label="closeButton"
            onClick={handleClose}
          >
            <Icon icon={solid("xmark")} />
          </span>
        )}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  closable: true,
  type: "default",
};

export default Alert;
