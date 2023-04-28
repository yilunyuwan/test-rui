import { fireEvent, render, screen } from "@testing-library/react";
import Tabs, { TabsProps } from "./tabs";
import TabItem from "./tabItem";
import { scopedClass } from "../../helpers/utils";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";

const defaultProps: TabsProps = {
  onSelect: jest.fn(),
};

const cardProps: TabsProps = {
  defaultIndex: 1,
  type: "card",
  onSelect: jest.fn(),
};

const generateComponent = (props: TabsProps) => (
  <Tabs {...props} data-testid="tabs">
    <TabItem label="选项一">
      <ul data-testid="content1">
        <li key={1}>睡觉</li>
        <li key={2}>吃饭</li>
        <li key={3}>逗猫</li>
      </ul>
    </TabItem>
    <TabItem label="选项二">学习 玩耍</TabItem>
    <TabItem label="禁用" disabled />
    <TabItem
      label={
        <span data-testid="customizedLabel">
          <CloseIcon />
          icon
        </span>
      }
    >
      自定义选项
    </TabItem>
  </Tabs>
);

let label1: HTMLElement,
  label2: HTMLElement,
  label3: HTMLElement,
  label4: HTMLElement,
  tabs: HTMLElement;
const setup = (props: TabsProps) => {
  render(generateComponent(props));
  label1 = screen.getByText("选项一");
  label2 = screen.getByText("选项二");
  label3 = screen.getByText("禁用");
  tabs = screen.getByRole("tablist");
  label4 = screen.getByTestId("customizedLabel");
};

const nav_sc = scopedClass("tabs-nav");
describe("test Tabs and TabItem component in default (card) type", () => {
  it("render correct Tabs and TabItem based on default props (card type)", () => {
    setup(defaultProps);
    expect(tabs).toHaveClass(`${nav_sc()} ${nav_sc("line")}`);
    expect(label1).toHaveClass("rui-tabs-nav-item-active");
    expect(label2).not.toHaveClass("rui-tabs-nav-item-active");
    expect(label3).toHaveAttribute("disabled");
    const content1 = screen.getByTestId("content1");
    let content2 = screen.queryByText("学习 玩耍");
    expect(content1).toBeInTheDocument();
    expect(content2).not.toBeInTheDocument();
    fireEvent.click(label3);
    expect(defaultProps.onSelect).not.toHaveBeenCalled();
    fireEvent.click(label2);
    expect(defaultProps.onSelect).toHaveBeenCalledWith(1);
    expect(content1).not.toBeInTheDocument();
    content2 = screen.getByText("学习 玩耍");
    expect(content2).toBeInTheDocument();
  });

  it("render correct Tabs and TabItem based on card type", () => {
    setup(cardProps);
    expect(tabs).toHaveClass(`${nav_sc()} ${nav_sc("card")}`);
    expect(label2).toHaveClass("rui-tabs-nav-item-active");
    expect(label1).not.toHaveClass("rui-tabs-nav-item-active");
    const content1 = screen.queryByTestId("content1");
    const content2 = screen.getByText("学习 玩耍");
    expect(content1).not.toBeInTheDocument();
    expect(content2).toBeInTheDocument();
  });

  it("render TabItem component with icon", () => {
    setup(cardProps);
    expect(tabs).toContainElement(label4);
  });
});
