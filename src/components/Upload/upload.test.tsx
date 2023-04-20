import { Upload } from "./upload";
import { fireEvent, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { UploadProps } from "./utils";
import axios from "axios";

const testProps = {
  action: "justForTest",
  onChange: jest.fn(),
  onSuccess: jest.fn(),
  onError: jest.fn(),
  onRemove: jest.fn(),
  supportDrag: true,
};

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
let uploadArea: HTMLElement, inputElement: HTMLInputElement;

const setup = (props: UploadProps) => {
  render(<Upload {...props}>upload</Upload>);
  uploadArea = screen.getByText("upload");
  inputElement = screen.getByAltText("fileInput");
};

const testFilename = "test.png";
const testFile = new File(["test"], testFilename, { type: "image/png" });
const basicFeaturesTest = async () => {
  // render the correct fileList, progress, icon
  expect(await screen.findByText(testFilename)).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  expect(
    await screen.findByRole("img", { name: /success/i })
  ).toBeInTheDocument();
  // life cycle functions execute correctly： onSuccess, onChange, onRemove
  expect(testProps.onSuccess).toHaveBeenCalledWith("mock", testFile);
  expect(testProps.onChange).toHaveBeenCalledWith(testFile);
  await user.click(screen.getByRole("button", { name: /delete/i }));
  expect(screen.queryByText(testFilename)).not.toBeInTheDocument();
  expect(testProps.onRemove).toHaveBeenCalledWith(
    expect.objectContaining({
      raw: testFile,
      status: "success",
      name: "test.png",
    })
  );
};

describe("test upload component", () => {
  beforeEach(() => {
    mockedAxios.post.mockResolvedValue({ data: "mock" });
  });
  it("After clicking Upload, life cycle functions and Progress work fine", async () => {
    setup(testProps);
    expect(uploadArea).toBeInTheDocument();
    expect(inputElement).not.toBeVisible();
    user.upload(inputElement, testFile);
    await basicFeaturesTest();
  });

  it("feature drag and drop works fine", async () => {
    setup(testProps);
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass("isDragOver");
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass("isDragOver");
    fireEvent.drop(uploadArea, { dataTransfer: { files: [testFile] } });
    await basicFeaturesTest();
  });
});
