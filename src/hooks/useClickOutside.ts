import { RefObject, useEffect } from "react";

const useClickOutside = (ref: RefObject<HTMLElement>, fn: Function) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement))
        return;
      fn(event);
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, fn]);
};

export default useClickOutside;
