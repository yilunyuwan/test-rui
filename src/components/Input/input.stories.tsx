import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Input from "./input";
import Icon from "../Icon/icon";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default {
  title: "表单/输入框 Input",
  component: Input,
  argTypes: {
    append: {
      control: false,
    },
    prepend: {
      control: false,
    },
    prefix: {
      control: false,
    },
    suffix: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="story-inputList">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: "输入框，基本表单组件。<br /> 支持原生 input 标签所有属性。",
      },
    },
  },
} as ComponentMeta<typeof Input>;

export const DefaultInput: ComponentStory<typeof Input> = (args) => (
  <Input {...args} />
);
DefaultInput.storyName = "默认输入框";
DefaultInput.args = {
  placeholder: "请输入",
};

export const InputSize: ComponentStory<typeof Input> = (args) => (
  <>
    <Input size="lg" placeholder="大输入框" {...args} />
    <Input placeholder="默认大小的输入框" {...args} />
    <Input size="sm" placeholder="小输入框" {...args} />
  </>
);
InputSize.storyName = "输入框尺寸";
InputSize.parameters = {
  docs: {
    description: {
      story: "输入框有大、中、小三种尺寸，默认尺寸为中。",
    },
  },
};

export const InputAffix = () => {
  const [searchWord, setSearchWord] = useState("");
  const searchIcon = (
    <Icon
      icon={solid("search")}
      style={{ cursor: "pointer" }}
      onClick={() => {
        window.open("https://cn.bing.com/search?q=" + searchWord, "_blank");
      }}
    />
  );
  const [passwordVisible, setPasswordVisible] = useState(false);
  const eyeIcon = (
    <Icon
      icon={solid("eye")}
      style={{ cursor: "pointer" }}
      onClick={() => setPasswordVisible(true)}
    />
  );
  const eyeSlashIcon = (
    <Icon
      icon={solid("eye-slash")}
      style={{ cursor: "pointer" }}
      onClick={() => setPasswordVisible(false)}
    />
  );
  return (
    <>
      <Input
        placeholder="搜索"
        suffix={searchIcon}
        value={searchWord}
        onChange={(e) => {
          setSearchWord(e.target.value);
        }}
      />
      <Input placeholder="用户名" prefix={<Icon icon={solid("user")} />} />
      <Input
        placeholder="密码"
        suffix={passwordVisible ? eyeSlashIcon : eyeIcon}
        type={passwordVisible ? "text" : "password"}
      />
    </>
  );
};
InputAffix.storyName = "前/后缀标签";
InputAffix.parameters = {
  docs: {
    description: {
      story: "可在输入框内加入前缀或后缀图标。",
    },
  },
};

export const InputAppend = () => {
  return (
    <>
      <Input placeholder="网址" prepend="http://" append=".com" />
      <Input
        defaultValue="git@github.com"
        append={<Icon icon={solid("copy")} />}
      />
    </>
  );
};
InputAppend.storyName = "前/后置标签";
InputAppend.parameters = {
  docs: {
    description: {
      story: "可在输入框左右侧加入前置或后置标签，形成固定搭配。",
    },
  },
};

export const InputDisabled = () => (
  <>
    <Input disabled value="禁用状态" />
  </>
);
InputDisabled.storyName = "禁用状态";
InputDisabled.parameters = {
  docs: {
    description: {
      story: "添加 `disabled` 属性可将按钮设置为禁用状态。",
    },
  },
};
