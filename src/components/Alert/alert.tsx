import React, { useState } from "react";
import { ReactComponent as IconClose } from "../../assets/close.svg";
import classnames from "classnames";
import ReactDOM from "react-dom";

type AlertType = "default" | "success" | "danger" | "warning";

export interface AlertProps {
  closable?: boolean;
  type?: AlertType;
  title: string;
  description?: string;
  className?: string;
  onClose?: () => void;
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
  const classes = classnames(className, "alert", { [`alert-${type}`]: true });
  const [visible, setVisible] = useState(true);
  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };
  const content = visible ? (
    <div className={classes} {...restProps}>
      {closable && (
        <span className="alert-close">
          <IconClose
            onClick={handleClose}
            role="button"
            aria-label="closeButton"
          />
        </span>
      )}
      <header className="alert-title">{title}</header>
      {description && <div className="alert-description">{description}</div>}
    </div>
  ) : null;
  return ReactDOM.createPortal(content, document.body);
};

Alert.defaultProps = {
  closable: true,
  type: "default",
};

export default Alert;
