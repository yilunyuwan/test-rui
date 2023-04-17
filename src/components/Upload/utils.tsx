import Icon from "../Icon/icon";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import React from "react";

export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  beforeUpload?: (file: File) => Boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onChange?: (file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (error: any, file: File) => void;
  onRemove?: (file: UploadFile) => void;
  children?: React.ReactNode;
}

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";

export interface UploadFile {
  uid: string;
  name: string;
  size?: number;
  status: UploadFileStatus;
  raw?: File;
  percentage?: number;
  response?: any;
  error?: any;
  url?: string;
}

export const statusIcon = (status: UploadFileStatus) => {
  switch (status) {
    case "success":
      return <Icon icon={solid("file-circle-check")} theme="success" />;
    case "error":
      return <Icon icon={solid("file-circle-xmark")} theme="danger" />;
    default:
      return <Icon icon={solid("spinner")} theme="primary" spin={true} />;
  }
};
