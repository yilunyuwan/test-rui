import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Upload } from "./upload";
import Button from "../Button/button";
import Icon from "../Icon/icon";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { action } from "@storybook/addon-actions";
import { ButtonType } from "../Button/button.stories";

export default {
  title: "表单/上传 Upload",
  component: Upload,
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="story-upload">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "上传，可将信息（网页、文字、图片、视频等）发布到远程服务器上。<br />" +
          "可通过选择文件及拖拽两种方式上传；可上传一个或多个文件；可展示上传进度。<br />",
      },
    },
  },
} as ComponentMeta<typeof Upload>;

const checkFileSize = (file: File) => {
  if (file.size / 1024 > 50) {
    alert("file size should be smaller than 50kb");
    return false;
  }
  return true;
};

const renameFile = (file: File) => {
  const renamedFile = new File([file], "whatever", { type: file.type });
  return Promise.resolve(renamedFile);
};

export const ClickUpload: ComponentStory<typeof Upload> = (args) => (
  <>
    <Upload {...args}>
      <Button>
        <Icon
          icon={solid("arrow-up-from-bracket")}
          style={{ marginRight: ".5rem" }}
        />
        点击上传
      </Button>
    </Upload>
  </>
);
ClickUpload.storyName = "点击上传";
ClickUpload.args = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
};
ClickUpload.parameters = {
  docs: {
    description: {
      story: "点击按钮后，弹出文件选择框",
    },
  },
};

export const DefaultFileListUpload: ComponentStory<typeof Upload> = (args) => (
  <>
    <Upload {...args}>
      <Button>
        <Icon
          icon={solid("arrow-up-from-bracket")}
          style={{ marginRight: ".5rem" }}
        />
        点击上传
      </Button>
    </Upload>
  </>
);
DefaultFileListUpload.storyName = "已上传的文件列表";
DefaultFileListUpload.args = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  defaultFileList: [
    {
      uid: "0",
      name: "image3.png",
      status: "uploading",
      percentage: 30,
    },
    {
      uid: "1",
      name: "image2.png",
      status: "success",
      response: { data: { id: 101 }, status: 201 },
    },
    {
      uid: "2",
      name: "image1.png",
      status: "error",
      error: "Server Error 503",
    },
  ],
};
DefaultFileListUpload.parameters = {
  docs: {
    description: {
      story: "可使用 `defaultFileList` 属性来设置已上传的文件列表",
    },
  },
};
