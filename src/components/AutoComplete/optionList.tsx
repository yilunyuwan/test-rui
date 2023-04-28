import React, { CSSProperties, forwardRef, useEffect } from "react";
import Icon from "../Icon/icon";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import classNames from "classnames";
import { scopedClass } from "../../helpers/utils";
import { Transition } from "../Transtition/transition";
import { useForwardRef } from "../../hooks/useForwardRef";

interface OptionListProps {
  suggestions: string[];
  visible: boolean;
  clearSuggestions: () => void;
  candidateIndex: number;
  handleSelect: (val: string) => void;
  isLoading: boolean;
  className: string;
  style?: CSSProperties;
}

export const OptionList = forwardRef<HTMLUListElement, OptionListProps>(
  (props, ref) => {
    const {
      suggestions,
      visible,
      clearSuggestions,
      candidateIndex,
      handleSelect,
      isLoading,
      className,
      style,
      ...restProps
    } = props;
    const refObject = useForwardRef(ref);
    const sc = scopedClass("autoComplete");
    const isVisible = (visible && !!suggestions.length) || isLoading;

    const setTransitionHeight = (element: HTMLElement) => {
      const height = element.offsetHeight;
      const transition = element.style.transition;
      element.style.transition = "";
      element.style.height = "auto";
      const targetHeight = element.offsetHeight;
      element.style.height = height + "px";
      element.style.transition = transition;
      requestAnimationFrame(() => {
        element.style.height = targetHeight + "px";
      });
    };

    useEffect(() => {
      if (refObject.current === null) return;
      setTransitionHeight(refObject.current);
    }, [isLoading, refObject]);

    const ulContent = () => {
      const loadingIcon = (
        <div className={sc("loadingIcon")}>
          <Icon icon={solid("spinner")} size="2x" spin />
        </div>
      );
      const suggestionItems = suggestions.map((value, index) => {
        const classes_item = classNames(sc("item"), {
          [sc("item-candidate")]: candidateIndex === index,
        });
        return (
          <li
            key={value}
            className={classes_item}
            onClick={() => handleSelect(value)}
            role="option"
            aria-selected={candidateIndex === index ? true : false}
          >
            {value}
          </li>
        );
      });

      return (
        <ul className={className} ref={refObject} role="listbox" {...restProps}>
          {isLoading ? loadingIcon : suggestionItems}
        </ul>
      );
    };

    return (
      <Transition
        in={isVisible}
        onExited={clearSuggestions}
        timeout={300}
        animation="zoom-in-top"
        requireWrapper={true}
      >
        {ulContent()}
      </Transition>
    );
  }
);
