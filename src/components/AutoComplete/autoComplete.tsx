import Input, { InputProps } from "../Input/input";
import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { scopedClass } from "../../helpers/utils";
import classNames from "classnames";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import { OptionList } from "./optionList";

type SuggestionsType = string[];

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestion: (
    value: string
  ) => SuggestionsType | Promise<SuggestionsType>;
  onSelect?: (value: string) => void;
  delay?: number;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestion, onSelect, delay, size, ...restProps } = props;
  const [suggestions, setSuggestions] = useState<SuggestionsType>([]);
  const [optionListVisible, setOptionListVisible] = useState(false);
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, delay);
  const triggerSuggestions = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [candidateIndex, setCandidateIndex] = useState(-1);
  const optionListRef = useRef<HTMLUListElement>(null);
  const inputWrapperRef = useRef<HTMLInputElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const clearSuggestions = () => setSuggestions([]);

  useEffect(() => {
    if (!triggerSuggestions.current) return;
    const results = fetchSuggestion(debouncedValue);
    if (results instanceof Promise) {
      setIsLoading(true);
      results
        .then((data) => {
          setIsLoading(false);
          if (data.length) {
            setSuggestions(data);
          } else {
            setOptionListVisible(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setOptionListVisible(false);
        });
    } else {
      if (results.length) {
        setSuggestions(results);
      } else {
        setOptionListVisible(false);
      }
    }
  }, [debouncedValue, fetchSuggestion]);

  useClickOutside(componentRef, () => setOptionListVisible(false));

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    setOptionListVisible(true);
    triggerSuggestions.current = true;
  };
  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue);
    if (onSelect) onSelect(selectedValue);
    setOptionListVisible(false);
    triggerSuggestions.current = false;
  };
  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (optionListRef.current === null || inputWrapperRef.current === null)
      return;
    const listHeight = optionListRef.current.clientHeight;
    const itemHeight = inputWrapperRef.current.clientHeight;
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (candidateIndex < 0) return;
        if ((candidateIndex + 1) * itemHeight > listHeight)
          optionListRef.current.scrollTop -= itemHeight;
        setCandidateIndex((index) => index - 1);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (candidateIndex >= suggestions.length - 1) return;
        if ((candidateIndex + 2) * itemHeight > listHeight)
          optionListRef.current.scrollTop += itemHeight;
        setCandidateIndex((index) => index + 1);
        break;
      case "Enter":
        if (candidateIndex < 0) return;
        handleSelect(suggestions[candidateIndex]);
        setCandidateIndex(-1);
        break;
      case "Escape":
        setOptionListVisible(false);
        setCandidateIndex(-1);
        break;
      default:
        break;
    }
  };

  const sc = scopedClass("autoComplete");
  const classes_list = classNames(sc("list"), {
    [sc("list", size)]: size,
  });

  return (
    <div ref={componentRef} className={sc("wrapper")}>
      <Input
        {...restProps}
        size={size}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputWrapperRef}
      />
      <OptionList
        visible={optionListVisible}
        clearSuggestions={clearSuggestions}
        isLoading={isLoading}
        className={classes_list}
        suggestions={suggestions}
        candidateIndex={candidateIndex}
        handleSelect={handleSelect}
        ref={optionListRef}
      />
    </div>
  );
};

AutoComplete.defaultProps = {
  delay: 300,
};

export default AutoComplete;
