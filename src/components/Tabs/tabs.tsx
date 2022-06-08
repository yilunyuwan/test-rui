import React, { ReactElement, ReactNode, useState } from "react";
import { TabItemProps } from "./tabItem";
import { scopedClass } from "../../helpers/utils";
import classNames from "classnames";

type TabsType = "line" | "card";

export interface TabsProps {
  defaultIndex?: number;
  type?: TabsType;
  onSelect?: (index: number) => void;
  className?: string;
  children?: React.ReactNode;
}

interface ITAbsContext {
  onClick?: (index: number) => void;
  selectedIndex: number;
}

const defaultProps: Required<Pick<TabsProps, "defaultIndex" | "type">> = {
  defaultIndex: 0,
  type: "line",
};

export const TabsContext = React.createContext<ITAbsContext>({
  selectedIndex: defaultProps.defaultIndex,
});

export const Tabs: React.FC<TabsProps> = (props) => {
  const {
    defaultIndex = defaultProps.defaultIndex,
    type = defaultProps.type,
    onSelect,
    className,
    children,
    ...restProps
  } = props;
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const sc = scopedClass("tabs");
  const tabs_classes = classNames(className, sc());
  const nav_classes = classNames(sc("nav"), sc("nav", type));
  const onClick = (index: number) => {
    if (onSelect) onSelect(index);
    setSelectedIndex(index);
  };
  const tabsContext: ITAbsContext = {
    onClick,
    selectedIndex,
  };
  let tabLabels: ReactElement[] = [],
    tabContents: ReactNode[] = [];
  const filterChildren = (children: React.ReactNode) => {
    React.Children.forEach(children, (child, index) => {
      if (typeof child !== "object") {
        console.error(
          "Warning: Tabs has a child which is not a TabItem component"
        );
        return;
      }
      const childElement =
        child as React.FunctionComponentElement<TabItemProps>;
      const displayName = childElement.type.displayName;
      if (displayName === "TabItem") {
        tabLabels.push(React.cloneElement(childElement, { index, key: index }));
        tabContents.push(childElement.props.children);
      } else {
        console.error(
          "Warning: Tabs has a child which is not a TabItem component"
        );
      }
    });
  };

  filterChildren(children);
  return (
    <TabsContext.Provider value={tabsContext}>
      <div className={tabs_classes} {...restProps}>
        <nav className={nav_classes} role="tablist" aria-label="tabs">
          {tabLabels}
        </nav>
        <main className={sc("content")} role="tabpanel">
          {tabContents[selectedIndex]}
        </main>
      </div>
    </TabsContext.Provider>
  );
};

Tabs.defaultProps = defaultProps;
