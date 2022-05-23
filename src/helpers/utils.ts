const libName = "rui";
export const scopedClass = (scope: string) => {
  return (name?: string, ...others: string[]) =>
    [libName, scope, name, ...others].filter(Boolean).join("-");
};
