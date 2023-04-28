import Progress, { ProgressProps } from "./progress";
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { scopedClass } from "../../helpers/utils";
import { ThemeArray } from "./utils";

const value = 30;
const defaultProps = {
  percentage: value,
};
const noInfoProps = {
  percentage: value,
  strokeColor: "dark",
  showText: false,
};

const successStatusProps = {
  percentage: value,
  status: "success",
};

const exceptionStatusProps = {
  percentage: value,
  status: "exception ",
};

const hundredProps = {
  percentage: 100,
};

let progressElement: HTMLElement, infoElement: HTMLElement | null;
const sc = scopedClass("progress");
const setup = (props: ProgressProps) => {
  render(<Progress {...props} />);
  progressElement = screen.getByRole("progressbar");
  infoElement = screen.queryByText(String(value) + "%");
};

describe("test progress component", () => {
  it("render the correct Progress with all kinds of theme colors", () => {
    ThemeArray.forEach((color) => {
      setup({ ...defaultProps, strokeColor: color });
      expect(progressElement).toHaveClass(`${sc()} ${sc(color)}`);
      cleanup();
    });
  });

  it("render the correct dark Progress without info", () => {
    setup(noInfoProps);
    expect(progressElement).toHaveClass(`${sc()} ${sc("dark")}`);
    expect(infoElement).not.toBeInTheDocument();
  });

  it("render the correct Progress with specific status", () => {
    setup(successStatusProps as ProgressProps);
    expect(progressElement).toHaveClass(`${sc("status-success")}`);
    cleanup();
    setup(exceptionStatusProps as ProgressProps);
    expect(progressElement).toHaveClass(`${sc("status-exception")}`);
  });

  it("one hundred percentage Progress having success status", () => {
    setup(hundredProps);
    expect(progressElement).toHaveClass(`${sc("status-success")}`);
  });
});
