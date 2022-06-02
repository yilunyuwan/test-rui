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
};
export const Transition: React.FC<TransitionProps> = (props) => {
  const { animation, classNames, children, ...restProps } = props;
  return (
    <CSSTransition
      {...restProps}
      classNames={classNames ? classNames : animation}
    >
      {children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};
