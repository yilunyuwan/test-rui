import React, { useCallback, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AutoComplete from "./autoComplete";
import Icon from "../Icon/icon";
import Alert from "../Alert/alert";

export default {
  title: "表单/自动提示 AutoComplete",
  component: AutoComplete,
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
      <div className="story-autoComplete">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "输入框的自动提示功能，根据输入内容提供对应提示。<br />" +
          "支持 Input 组件所有属性。<br/>" +
          "支持同步异步两种方式获取提示数据，支持输入防抖，支持键盘控制事件。<br/>" +
          "键盘上下方向键可选择候选提示，Enter 键确认选择，Esc 键退出提示",
      },
    },
  },
} as ComponentMeta<typeof AutoComplete>;

const mailSuffixes = [
  "qq.com",
  "126.com",
  "163.com",
  "outlook.com",
  "gmail.com",
  "yahoo.com",
];
export const DefaultAutoComplete: ComponentStory<typeof AutoComplete> = (
  args
) => (
  <>
    <AutoComplete {...args} />
    <Alert title="键盘上下方向键可选择候选提示，Enter 键确认选择，Esc 键退出提示" />
  </>
);
DefaultAutoComplete.storyName = "默认自动提示";
DefaultAutoComplete.args = {
  placeholder: "请输入邮箱",
  fetchSuggestion: (value) => {
    if (value === "") return [];
    return mailSuffixes.map((mailSuffix) => value + "@" + mailSuffix);
  },
};

export const AsyncAutoComplete: ComponentStory<typeof AutoComplete> = (
  args
) => {
  const [error, setError] = useState<Error | null>(null);
  const handleFetch = useCallback((query: string) => {
    if (query !== "")
      return fetch(`https://api.github.com/search/users?q=${query}`)
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) return data;
          else return Promise.reject(data);
        })
        .then(({ items }) => {
          setError(null);
          return items?.length
            ? items.slice(0, 10).map((item: { login: string }) => item.login)
            : [];
        })
        .catch(setError);
    else return [];
  }, []);
  return (
    <>
      <Alert title="每分钟有搜索次数限制" type="warning" />
      <AutoComplete
        {...args}
        fetchSuggestion={handleFetch}
        suffix={<Icon icon={["fab", "github"]} />}
      />
      {error && <div className="story-error">{error.message}</div>}
    </>
  );
};
AsyncAutoComplete.storyName = "异步搜索的自动提示";
AsyncAutoComplete.args = {
  placeholder: "搜索 GitHub 用户",
};
