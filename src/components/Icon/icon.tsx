import React, { SVGAttributes } from "react";
import classnames from "classnames";

type IconProps = {
  name: string;
  className?: string;
} & SVGAttributes<SVGElement>;

export const Icon: React.FC<IconProps> = (props) => {
  const { name, className, ...restProps } = props;
  return (
    <svg className={classnames("icon")} {...restProps}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default Icon;
