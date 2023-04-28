import Tabs, { TabsProps } from "./tabs";
import TabItem, { TabItemProps } from "./tabItem";
import React from "react";

type CompoundedTabsProps = React.FC<TabsProps> & {
  Item: React.FC<TabItemProps>;
};

const CompoundedTabs = Tabs as CompoundedTabsProps;
CompoundedTabs.Item = TabItem;
export default CompoundedTabs;
