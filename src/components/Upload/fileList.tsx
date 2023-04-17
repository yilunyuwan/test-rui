import React from "react";

import { scopedClass } from "../../helpers/utils";
import Icon from "../Icon/icon";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { statusIcon, UploadFile } from "./utils";
import classNames from "classnames";
import { Progress } from "../Progress/progress";

interface FileListProps {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
}

export const FileList: React.FC<FileListProps> = (props) => {
  const { fileList, onRemove } = props;
  const sc = scopedClass("upload-fileList");

  return (
    <ol className={sc()}>
      {fileList.map((file) => (
        <li key={file.uid} className={sc("item")}>
          <span className={sc("item", "info")}>
            <span className={sc("item", "info", "status")}>
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

          <span className={sc("item", "action")} onClick={() => onRemove(file)}>
            <Icon icon={solid("xmark")} />
          </span>
          {file.status === "uploading" && (
            <Progress percentage={file.percentage || 0} />
          )}
        </li>
      ))}
    </ol>
  );
};
