import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Tabs from "./index";
import Icon from "../Icon";

export default {
  title: "导航/标签页 Tabs",
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
    <Tabs.Item label="标签一">标签一的内容</Tabs.Item>
    <Tabs.Item disabled label="标签二 禁用">
      标签二的内容
    </Tabs.Item>
    <Tabs.Item label="标签三">标签三的内容</Tabs.Item>
  </Tabs>
);
export const DefaultTabs = Template.bind({});
DefaultTabs.storyName = "默认标签页";
DefaultTabs.parameters = {
  docs: {
    source: {
      type: "code",
    },
  },
};
export const VerticalTabs = Template.bind({});
VerticalTabs.storyName = "卡片式标签页";
VerticalTabs.args = {
  type: "card",
};
VerticalTabs.parameters = {
  docs: {
    source: {
      type: "code",
    },
  },
};
export const IconTabs: ComponentStory<typeof Tabs> = (args) => {
  const label1 = (
    <span>
      <Icon icon="user" />
      标签一
    </span>
  );
  const label2 = (
    <span>
      <Icon icon="ban" />
      标签二 禁用
    </span>
  );
  const label3 = (
    <span>
      <Icon icon="pie-chart" />
      标签三
    </span>
  );
  return (
    <Tabs {...args}>
      <Tabs.Item label={label1}>标签一的内容</Tabs.Item>
      <Tabs.Item disabled label={label2}>
        标签二的内容
      </Tabs.Item>
      <Tabs.Item label={label3}>标签三的内容</Tabs.Item>
    </Tabs>
  );
};
IconTabs.storyName = "带图标的标签";

IconTabs.decorators = [
  (Story) => (
    <div className="story-iconTabs">
      <Story />
    </div>
  ),
];
IconTabs.parameters = {
  docs: {
    source: {
      type: "code",
    },
  },
};
