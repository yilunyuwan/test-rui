import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "./input";

export default {
  title: "表单/输入框 Input",
  component: Input,
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="story-buttonList">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "按钮，响应用户的点击行为。<br /> 支持原生 button 标签及 a 标签的所有属性。",
      },
    },
  },
} as ComponentMeta<typeof Input>;

export const DefaultButton: ComponentStory<typeof Input> = (args) => (
  <Input {...args}>按钮</Input>
);
DefaultButton.storyName = "默认输入框";

export const ButtonType = () => (
  <>
    <Input>默认按钮</Input>
  </>
);
ButtonType.storyName = "按钮类型";
ButtonType.parameters = {
  docs: {
    description: {
      story: "按钮有四种类型：默认按钮、主要按钮、危险按钮和链接按钮。",
    },
  },
};

export const ButtonSize = () => (
  <>
    <Input size="lg">大</Input>
    <Input>中</Input>
    <Input size="sm">小</Input>
  </>
);
ButtonSize.storyName = "按钮尺寸";
ButtonSize.parameters = {
  docs: {
    description: {
      story: "按钮有大、中、小三种尺寸，默认尺寸为中。",
    },
  },
};

export const ButtonDisabled = () => (
  <>
    <Input disabled>默认按钮 禁用</Input>
  </>
);
ButtonDisabled.storyName = "禁用状态";
ButtonDisabled.parameters = {
  docs: {
    description: {
      story: "添加 `disabled` 属性可将按钮设置为禁用状态。",
    },
  },
};
