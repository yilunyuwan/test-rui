const libName = "rui";
export const scopedClass = (scope: string) => {
  return (name?: string) => [libName, scope, name].filter(Boolean).join("-");
};
