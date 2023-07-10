import React from "react";
import { scopedClass } from "../../helpers/utils";
import Icon from "../Icon/icon";
import { statusIcon, UploadFile } from "./utils";
import classNames from "classnames";
import Progress from "../Progress/progress";

interface FileListProps {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
}

export const FileList: React.FC<FileListProps> = (props) => {
  const { fileList, onRemove } = props;
  const sc = scopedClass("upload-fileList");
  const showProgress = (status: string) =>
    status === "ready" || status === "uploading";
  return (
    <ol className={sc()}>
      {fileList.map((file) => (
        <li key={file.uid} className={sc("item")}>
          <span className={sc("item", "info")}>
            <span
              className={sc("item", "info", "status")}
              role="img"
              aria-label={file.status}
            >
              {statusIcon(file.status)}
            </span>

            <a
              className={classNames(sc("item", "info", "name"), {
                [`uploadFile-${file.status}`]: true,
              })}
              href={file.url}
              target="_blank"
              rel="noreferrer"
            >
              {file.name}
            </a>
          </span>

          <span
            className={sc("item", "action")}
            onClick={() => onRemove(file)}
            role="button"
            aria-label="delete"
          >
            <Icon icon="xmark" />
          </span>
          {showProgress(file.status) && (
            <Progress percentage={file.percentage || 0} />
          )}
        </li>
      ))}
    </ol>
  );
};
