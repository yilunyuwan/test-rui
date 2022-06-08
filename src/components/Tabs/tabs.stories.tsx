import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tabs } from "./tabs";
import { TabItem } from "./tabItem";
import Icon from "../Icon/icon";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default {
  title: "视图/标签页 Tabs",
  component: Tabs,
  argTypes: {
    defaultIndex: {
      control: {
        type: "radio",
        options: [0, 1, 2],
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `标签页，通过切换选项卡展现相关但不同类别的数据。<br />
                    支持下划线式和卡片式两种标签样式。<br />
                    <code>Tabs</code>标签只接受<code>TabItem</code>标签作为子元素。<br/>`,
      },
    },
    source: {
      excludeDecorators: true,
    },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <TabItem label="标签一">标签一的内容</TabItem>
    <TabItem disabled label="标签二 禁用">
      标签二的内容
    </TabItem>
    <TabItem label="标签三">标签三的内容</TabItem>
  </Tabs>
);
export const DefaultTabs = Template.bind({});
DefaultTabs.storyName = "默认标签页";

export const VerticalTabs = Template.bind({});
VerticalTabs.storyName = "卡片式标签页";
VerticalTabs.args = {
  type: "card",
};

export const IconTabs: ComponentStory<typeof Tabs> = (args) => {
  const label1 = (
    <span>
      <Icon icon={solid("user")} />
      标签一
    </span>
  );
  const label2 = (
    <span>
      <Icon icon={solid("ban")} />
      标签二 禁用
    </span>
  );
  const label3 = (
    <span>
      <Icon icon={solid("pie-chart")} />
      标签三
    </span>
  );
  return (
    <Tabs {...args}>
      <TabItem label={label1}>标签一的内容</TabItem>
      <TabItem disabled label={label2}>
        标签二的内容
      </TabItem>
      <TabItem label={label3}>标签三的内容</TabItem>
    </Tabs>
  );
};
IconTabs.storyName = "带图标的标签";

IconTabs.parameters = {
  docs: {
    source: {
      type: "code",
    },
  },
};
