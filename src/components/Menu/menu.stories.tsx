import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Menu from "./index";

export default {
  title: "导航/菜单 Menu",
  component: Menu,
  argTypes: {
    defaultIndex: {
      control: {
        type: "select",
        options: ["0", "1", "2-0", "2-1", "3-0", "3-1"],
      },
    },
    openedIndexes: {
      if: {
        arg: "mode",
        eq: "vertical",
      },
      control: {
        type: "select",
        options: [["2"], ["3"], ["2", "3"]],
      },
    },
    style: {
      control: "object",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `菜单列表，用于导航。<br />
                    支持横向和纵向两种模式，支持下拉菜单。<br />
                    <code>Menu</code>标签只接受<code>Menu.Item</code>标签或<code>SubMenu</code>标签作为子元素。<br/>
                    <code>SubMenu</code>标签只接受<code>Menu.Item</code>标签作为子元素。`,
      },
    },
    source: {
      excludeDecorators: true,
    },
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <h5>注意事项</h5>
        <br />
        <p>
          组件会自动为每一菜单项设定索引值，索引值是根据该菜单项在默认菜单中的顺序而决定。如上述导航菜单中，选项一的索引值为
          <code>"0"</code>,选项四的索引值为<code>"2-1"</code>。
        </p>
        <p>
          若在Controls面板修改 <code>defaultIndex</code> 或{" "}
          <code>openedIndexes</code> 选项，需点击工具栏中刷新按钮(Remount
          component)才能观察到效果。
        </p>
        <p>
          由于Storybook限制，Controls面板的Control栏位只能以字符串形式显示，易产生误解，
          <code>openedIndexes</code> 的类型实际为 <code>string[]</code>
        </p>
      </>
    ),
  ],
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <Menu.Item>选项一</Menu.Item>
    <Menu.Item disabled>选项二 禁用</Menu.Item>
    <Menu.SubMenu title="下拉菜单一">
      <Menu.Item>选项三</Menu.Item>
      <Menu.Item>选项四</Menu.Item>
    </Menu.SubMenu>
    <Menu.SubMenu title="下拉菜单二">
      <Menu.Item>选项五</Menu.Item>
      <Menu.Item disabled>选项六 禁用</Menu.Item>
    </Menu.SubMenu>
  </Menu>
);
export const DefaultMenu = Template.bind({});
DefaultMenu.storyName = "默认菜单";
DefaultMenu.parameters = {
  docs: {
    source: {
      type: "code",
    },
  },
};

export const VerticalMenu = Template.bind({});
VerticalMenu.storyName = "纵向菜单";
VerticalMenu.args = {
  mode: "vertical",
  style: { width: 256 },
};
VerticalMenu.parameters = {
  docs: {
    source: {
      type: "code",
    },
  },
};

export const ExpandedVerticalMenu = Template.bind({});
ExpandedVerticalMenu.storyName = "指定展开的纵向菜单";
ExpandedVerticalMenu.args = {
  mode: "vertical",
  openedIndexes: ["2"],
  style: { width: 256 },
};
ExpandedVerticalMenu.parameters = {
  docs: {
    source: {
      type: "code",
    },
  },
};
