import React, { DragEventHandler, useState } from "react";
import { scopedClass } from "../../helpers/utils";
import classnames from "classnames";
interface DragProps {
  children: React.ReactNode;
  onFile: (fileList: FileList) => void;
}
export const DragWrapper: React.FC<DragProps> = (props) => {
  const { children, onFile } = props;
  const [isDragOver, setDragOver] = useState(false);
  const handleDragOver: DragEventHandler = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDrop: DragEventHandler = (e) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };
  const sc = scopedClass("upload-dragger");
  return (
    <div
      className={classnames(sc(), { isDragOver: isDragOver })}
      onDragOver={handleDragOver}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};
