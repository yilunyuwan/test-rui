import { CSSTransition } from "react-transition-group";
import React from "react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationType =
  | "zoom-in-top"
  | "zoom-in-bottom"
  | "zoom-in-left"
  | "zoom-in-right";

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationType;
  requireWrapper?: boolean;
};
export const Transition: React.FC<TransitionProps> = (props) => {
  const { animation, requireWrapper, classNames, children, ...restProps } =
    props;
  const content =
    requireWrapper && typeof children === "object" ? (
      <div>{children}</div>
    ) : (
      children
    );
  return (
    <CSSTransition
      {...restProps}
      classNames={classNames ? classNames : animation}
    >
      {content}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
  requireWrapper: false,
};
