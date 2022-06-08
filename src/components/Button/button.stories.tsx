import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./button";

export default {
  title: "基础/按钮 Button",
  component: Button,
  argTypes: {
    href: {
      if: {
        arg: "btnType",
        eq: "link",
      },
    },
  },
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
} as ComponentMeta<typeof Button>;

export const DefaultButton: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>按钮</Button>
);
DefaultButton.storyName = "默认按钮";

export const ButtonType = () => (
  <>
    <Button>默认按钮</Button>
    <Button btnType="primary">主要按钮</Button>
    <Button btnType="danger">危险按钮</Button>
    <Button btnType="link" href="https://baidu.com" target="_blank">
      链接按钮
    </Button>
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
    <Button size="large">大</Button>
    <Button>中</Button>
    <Button size="small">小</Button>
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
    <Button disabled>默认按钮 禁用</Button>
    <Button disabled btnType="primary">
      主要按钮 禁用
    </Button>
    <Button disabled btnType="danger">
      危险按钮 禁用
    </Button>
    <Button disabled btnType="link" href="https://baidu.com" target="_blank">
      链接按钮 禁用
    </Button>
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
