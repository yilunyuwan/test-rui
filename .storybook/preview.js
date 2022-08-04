import "../src/styles/index.scss";
import "../src/styles/_stories.scss";

export const argTypes = {
  className: {
    table: {
      disable: true,
    },
  },
  children: {
    table: {
      disable: true,
    },
  },
  style: {
    table: {
      disable: true,
    },
  },
  onChange: {
    table: {
      disable: true,
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    sort: "requiredFirst",
    expanded: true,
    hideNoControlsWarning: true,
  },
  options: {
    storySort: {
      order: [
        "基础",
        "表单",
        ["输入框 Input", "自动提示 AutoComplete"],
        "导航",
        ["菜单 Menu", "标签页 Tabs"],
      ],
    },
  },
  docs: {
    source: {
      excludeDecorators: true,
    },
  },
  viewMode: "docs",
};
