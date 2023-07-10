import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Progress from "./progress";
import Icon from "../Icon/icon";
import Button from "../Button/button";

export default {
  title: "视图/进度条 Progress",
  component: Progress,
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="story-ProgressList">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: "进度条，展示操作的当前进度。",
      },
    },
  },
} as ComponentMeta<typeof Progress>;

export const DefaultProgress: ComponentStory<typeof Progress> = (args) => {
  if (args.percentage === undefined) args.percentage = 30;
  return <Progress {...args} />;
};
DefaultProgress.storyName = "默认进度条";

export const DynamicProgress = () => {
  const [percentage, setPercentage] = useState(30);
  const increasePercentage = () => {
    if (percentage + 10 <= 100) {
      setPercentage((prev) => prev + 10);
    }
  };
  const decreasePercentage = () => {
    if (percentage - 10 >= 0) {
      setPercentage((prev) => prev - 10);
    }
  };
  return (
    <>
      <Progress percentage={percentage} />
      <div className="story-buttonList">
        <Button size="sm" onClick={increasePercentage}>
          <Icon icon="plus" size="xs" />
        </Button>
        <Button size="sm" onClick={decreasePercentage}>
          <Icon icon="minus" size="xs" />
        </Button>
      </div>
    </>
  );
};
DynamicProgress.storyName = "动态进度条展示";

export const ProgressWithoutText = () => {
  const [percentage, setPercentage] = useState(30);
  const increasePercentage = () => {
    if (percentage + 10 <= 100) {
      setPercentage((prev) => prev + 10);
    }
  };
  const decreasePercentage = () => {
    if (percentage - 10 >= 0) {
      setPercentage((prev) => prev - 10);
    }
  };
  return (
    <>
      <Progress percentage={percentage} showText={false} />
      <div className="story-buttonList">
        <Button size="sm" onClick={increasePercentage}>
          <Icon icon="plus" size="xs" />
        </Button>
        <Button size="sm" onClick={decreasePercentage}>
          <Icon icon="minus" size="xs" />
        </Button>
      </div>
    </>
  );
};
ProgressWithoutText.storyName = "不显示文字的进度条";

export const ProgressStyle = () => (
  <div className="story-progressList">
    <Progress percentage={30} />
    <Progress percentage={70} status="exception" />
    <Progress percentage={100} />
    <Progress percentage={50} strokeColor="secondary" showText={false} />
  </div>
);
ProgressStyle.storyName = "进度条样式";
