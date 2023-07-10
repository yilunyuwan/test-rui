import Icon from "../Icon/icon";
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
  headers?: { [k: string]: any };
  name?: string;
  data?: { [k: string]: any };
  withCredentials?: boolean;
  multiple?: boolean;
  accept?: string;
  supportDrag?: boolean;
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
      return <Icon icon="file-circle-check" theme="success" />;
    case "error":
      return <Icon icon="file-circle-xmark" theme="danger" />;
    default:
      return <Icon icon="spinner" theme="primary" spin={true} />;
  }
};
