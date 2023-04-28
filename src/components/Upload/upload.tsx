import React, { ChangeEvent, useRef, useState } from "react";
import { scopedClass } from "../../helpers/utils";
import classNames from "classnames";
import axios from "axios";
import { FileList } from "./fileList";
import { UploadFile, UploadProps } from "./utils";
import { DragWrapper } from "./dragWrapper";

const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onChange,
    onSuccess,
    onError,
    onRemove,
    children,
    headers,
    name,
    data,
    withCredentials,
    multiple,
    accept,
    supportDrag,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = (removedFile: UploadFile) => {
    setFileList((prevFileList) =>
      prevFileList.filter((file) => file.uid !== removedFile.uid)
    );
    if (onRemove) onRemove(removedFile);
  };

  const uploadFiles = (files: FileList) => {
    const filesArray = Array.from(files);
    filesArray.forEach((file) => {
      if (beforeUpload) {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => post(processedFile));
          return;
        }
        if (!result) return;
      }
      post(file);
    });
  };

  const updateFileAttribute = (
    updateFile: UploadFile,
    updateAttribute: Partial<UploadFile>
  ) => {
    setFileList((prevFileList) => {
      return prevFileList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...updateFile, ...updateAttribute };
        }
        return file;
      });
    });
  };

  const post = (file: File) => {
    const formData = new FormData();
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    const _file: UploadFile = {
      uid: "uploadFile" + Date.now(),
      name: file.name,
      size: file.size,
      raw: file,
      status: "ready",
      percentage: 0,
    };
    setFileList((prevFileList) => [_file, ...prevFileList]);

    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          if (percentage <= 100) {
            if (onProgress) onProgress(percentage, file);
            updateFileAttribute(_file, { percentage, status: "uploading" });
          }
        },
      })
      .then((resp) => {
        updateFileAttribute(_file, { status: "success", response: resp });
        if (onSuccess) onSuccess(resp.data, file);
        if (onChange) onChange(file);
      })
      .catch((err) => {
        updateFileAttribute(_file, { status: "error", error: err });
        if (onError) onError(err, file);
        if (onChange) onChange(file);
      });
  };

  const sc = scopedClass("upload");
  return (
    <div className={sc()}>
      <div className={classNames(sc("input-wrapper"))} onClick={handleClick}>
        {supportDrag ? (
          <DragWrapper onFile={uploadFiles}>{children}</DragWrapper>
        ) : (
          children
        )}
        <input
          type="file"
          alt="fileInput"
          className={classNames(sc("input"))}
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleChange}
          multiple={multiple}
          accept={accept}
        />
      </div>
      <FileList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

export default Upload;
