import { MutableRefObject, Ref, useEffect, useRef } from "react";

export const useForwardRef = <T>(ref: Ref<T | null>) => {
  const innerRef = useRef<T>(null);
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") ref(innerRef.current);
    else (ref as MutableRefObject<T | null>).current = innerRef.current;
  });

  return innerRef;
};
