import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Alert from "./alert";

export default {
  title: "视图/警告 Alert",
  component: Alert,
  argTypes: {
    onClose: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "警告，提示重要信息。<br /> 非浮层元素，点击右侧的关闭按钮后才会消失。",
      },
    },
  },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;
export const DefaultAlert = Template.bind({});
DefaultAlert.storyName = "默认警告";
DefaultAlert.args = {
  title: "默认警告",
};

export const AlertType = () => (
  <>
    <Alert title="默认提示" />
    <Alert title="成功提示" type="success" />
    <Alert title="警告提示" type="warning" />
    <Alert title="错误提示" type="danger" />
  </>
);
AlertType.storyName = "警告类型";
AlertType.parameters = {
  docs: {
    description: {
      story: "警告提示有四种类型：默认提示、成功提示、警告提示和错误提示。",
    },
  },
};

export const AlertClosable = () => (
  <>
    <Alert title="点击右侧关闭按钮后可关闭" />
    <Alert title="不可关闭的警告" closable={false} />
  </>
);
AlertClosable.storyName = "不可关闭的警告";
AlertClosable.parameters = {
  docs: {
    description: {
      story:
        "警告默认可关闭，设置参数 `closable` 为 `false` 展示不可关闭的警告",
    },
  },
};

export const AlertDescription = Template.bind({});
AlertDescription.storyName = "带辅助描述的警告";
AlertDescription.args = {
  title: "添加辅助描述的方法",
  description: "设置参数description，可为警告添加详细描述。".repeat(8),
};
AlertDescription.parameters = {
  docs: {
    description: {
      story: "设置参数 `description` 可为警告添加详细描述",
    },
  },
};
