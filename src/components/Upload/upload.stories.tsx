import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Upload } from "./upload";
import Button from "../Button/button";
import Icon from "../Icon/icon";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default {
  title: "表单/上传 Upload",
  component: Upload,
  argTypes: {
    action: { control: false },
  },
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

export const DragUpload: ComponentStory<typeof Upload> = (args) => (
  <>
    <Upload {...args}>
      <div className="story-upload-dragger">
        <Icon
          icon={solid("arrow-up-from-bracket")}
          size="3x"
          style={{ marginBottom: "1rem" }}
        />
        <div>点击或拖动文件至此区域上传</div>
      </div>
    </Upload>
  </>
);
DragUpload.storyName = "拖曳上传";
DragUpload.args = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  supportDrag: true,
};
DragUpload.parameters = {
  docs: {
    description: {
      story: "拖动文件至此区域上传，同样也支持点击上传",
    },
  },
};

export const BeforeUpload: ComponentStory<typeof Upload> = (args) => (
  <>
    <div className="story-uploadList">
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={checkFileSize}
      >
        <Button>
          <Icon
            icon={solid("arrow-up-from-bracket")}
            style={{ marginRight: ".5rem" }}
          />
          限制文件小于50kb
        </Button>
      </Upload>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={renameFile}
      >
        <Button>
          <Icon
            icon={solid("arrow-up-from-bracket")}
            style={{ marginRight: ".5rem" }}
          />
          转换文件名称
        </Button>
      </Upload>
    </div>
  </>
);
BeforeUpload.storyName = "上传前自定义操作";
BeforeUpload.args = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  beforeUpload: checkFileSize,
};

BeforeUpload.parameters = {
  docs: {
    description: {
      story:
        "使用<code>beforeUpload</code>可在上传前进行自定义操作，如限制文件大小或转换文件。<br/>" +
        "<code>beforeUpload</code>的返回值可以是Promise。",
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
      story:
        "可使用 `defaultFileList`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  来设置已上传的文件列表。",
    },
  },
};
