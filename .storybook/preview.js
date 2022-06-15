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
      order: ["基础", "视图"],
    },
  },
  docs: {
    source: {
      excludeDecorators: true,
    },
  },
  viewMode: "docs",
};
