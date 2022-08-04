import React from "react";

const libName = "rui";
export const scopedClass = (scope: string) => {
  return (name?: string, ...others: (string | undefined)[]) =>
    [libName, scope, name, ...others].filter(Boolean).join("-");
};

export const insertSpaceInButton = (children: React.ReactNode) => {
  let result = children;
  if (typeof children === "string") {
    const isChinese = new RegExp("[\u4E00-\u9FA5]+");
    if (isChinese.test(children) && children.length === 2) {
      result = `${children[0]} ${children[1]}`;
    }
  }
  return result;
};
