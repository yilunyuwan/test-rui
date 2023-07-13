import React from "react";
import { ComponentMeta } from "@storybook/react";
import Icon, { IconProps } from "./icon";

export default {
  title: "基础/图标 Icon",
  component: Icon,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["2xs", "xs", "sm", "lg", "xl", "2xl"],
      },
      description: `支持两种描述尺寸的格式<br/>
      Relative Sizing: 2xs(0.625em), xs(0.75em), sm(0.875em), lg(1.25em), xl(1,5em), 2xl(2em)<br/>
      Literal Sizing: 1x(1em), 2x(2em), ..., 10x(10em)
      `,
      table: {
        type: {},
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="story-iconList">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `基于 [React Font Awesome](https://github.com/FortAwesome/react-fontawesome) 提供了一套常用的图标集合。<br />
                    通过设置 <code>Icon</code> 组件的 <code>icon</code> 属性来指定图标名称。<br/>
                    可用的图标集合详见 [Free Icons](https://fontawesome.com/search?m=free)<br/>
                    支持的样式属性详见 [Adding Icon Styling with React](https://fontawesome.com/v6/docs/web/use-with/react/style)
`,
      },
    },
    source: {
      excludeDecorators: true,
    },
  },
} as ComponentMeta<typeof Icon>;

export const DefaultIcons = ({ size, theme }: IconProps) => (
  <>
    <Icon icon="angle-left" size={size} theme={theme} />
    <Icon icon={["fab", "github"]} size={size} theme={theme} />
    <Icon icon={["far", "face-grin-wink"]} size={size} theme={theme} />
    <Icon icon="angle-right" size={size} theme={theme} />
  </>
);
DefaultIcons.storyName = "图标";

export const ThemeIcons = ({ size }: IconProps) => (
  <>
    <Icon icon={["far", "face-grin-wink"]} theme="success" size={size} />
    <code>success</code>
    <Icon icon={["far", "face-grin-wink"]} theme="danger" size={size} />
    <code>danger</code>
    <Icon icon={["far", "face-grin-wink"]} theme="warning" size={size} />
    <code>warning</code>
    <Icon icon={["far", "face-grin-wink"]} theme="primary" size={size} />
    <code>primary</code>
    <Icon icon={["far", "face-grin-wink"]} theme="secondary" size={size} />
    <code>secondary</code>
    <Icon icon={["far", "face-grin-wink"]} theme="info" size={size} />
    <code>info</code>
    <Icon icon={["far", "face-grin-wink"]} theme="light" size={size} />
    <code>light</code>
    <Icon icon={["far", "face-grin-wink"]} theme="dark" size={size} />
    <code>dark</code>
  </>
);
ThemeIcons.storyName = "图标样式";

export const SizeIcons = ({ theme }: IconProps) => (
  <div>
    <div className="story-iconRow">
      <span className="story-iconWrapper">
        <Icon icon={["far", "face-grin-wink"]} theme={theme} size="xs" />
        <code>xs</code>
      </span>
      <span className="story-iconWrapper">
        <Icon icon={["far", "face-grin-wink"]} theme={theme} size="sm" />
        <code>sm</code>
      </span>
      <span className="story-iconWrapper">
        <Icon icon={["far", "face-grin-wink"]} theme={theme} size="1x" />
        <code>1x</code>
      </span>
      <span className="story-iconWrapper">
        <Icon icon={["far", "face-grin-wink"]} theme={theme} size="lg" />
        <code>lg</code>
      </span>
    </div>
    <div className="story-iconRow">
      <span className="story-iconWrapper">
        <Icon icon={["far", "face-grin-wink"]} theme={theme} size="1x" />
        <code>1x</code>
      </span>
      <span className="story-iconWrapper">
        <Icon icon={["far", "face-grin-wink"]} theme={theme} size="2x" />
        <code>2x</code>
      </span>
      <span className="story-iconWrapper">
        <Icon icon={["far", "face-grin-wink"]} theme={theme} size="3x" />
        <code>3x</code>
      </span>
      <span className="story-iconWrapper">
        <Icon icon={["far", "face-grin-wink"]} theme={theme} size="5x" />
        <code>5x</code>
      </span>
      <span className="story-iconWrapper">
        <Icon icon={["far", "face-grin-wink"]} theme={theme} size="8x" />
        <code>8x</code>
      </span>
    </div>
  </div>
);
SizeIcons.storyName = "图标尺寸";
