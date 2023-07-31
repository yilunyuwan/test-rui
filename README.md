RUI 是一套基于 React / TypeScript 实现的 UI 组件库，主要组件有导航菜单、自动完成、上传等。
文档页面使用 Storybook 制作而成，可快速修改属性并实时看到变化。

- 使用 Jest 以及 React Testing Library 实现单测覆盖率大于 90%。
- 使用第三方库（react-fontawesome, react-transition-group）扩充组件，提供图标库及实现过渡动画效果。
- 使用 SASS 预处理 CSS，通过其变量、mixin、嵌套等功能，提高 CSS 代码的可维护性。
- 使用 Github Actions 完成 CI/CD 以及自动发布至 npm。

[预览地址](https://yilunyuwan.gitee.io/rui/) [源码链接](https://gitee.com/yilunyuwan/RUI) [项目笔记](https://gitee.com/yilunyuwan/RUI/wikis/pages)

# 快速开始

## 安装

### 使用 npm

```shell
$ npm install rui-react
```

### 使用 yarn

```shell
$ yarn add rui-react
```

## 使用示例

### 1. 引入样式

在项目的入口文件（如`index.tsx`）中引入样式

```js
import "rui-react/dist/index.css";
```

### 2. 使用组件

```js
import React from "react";
import { Button } from "rui-react";

const App = () => {
  return <Button>默认按钮</Button>;
};

export default App;
```
