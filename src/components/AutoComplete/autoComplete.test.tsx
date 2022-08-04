import { AutoComplete, AutoCompleteProps } from "./autoComplete";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const testArray = ["ab", "abc", "b", "c"];
const testProps: AutoCompleteProps = {
  fetchSuggestion: (query) => testArray.filter((item) => item.includes(query)),
  onSelect: jest.fn(),
  placeholder: "autoComplete",
};

describe("test AutoComplete component", () => {
  it("test basic AutoComplete behavior", async () => {
    render(<AutoComplete {...testProps} />);
    const inputNode = screen.getByPlaceholderText(
      "autoComplete"
    ) as HTMLInputElement;
    fireEvent.change(inputNode, { target: { value: "a" } });
    // 因为在 AutoComplete 的输入中加了防抖，所以要过一小段时间下拉菜单才会出现
    await waitFor(() => {
      expect(screen.getByText("ab")).toBeInTheDocument();
    });
    expect(screen.getAllByRole("option").length).toEqual(2);
    fireEvent.click(screen.getByText("ab"));
    expect(testProps.onSelect).toHaveBeenCalledWith("ab");
    await waitFor(() => {
      expect(screen.queryByText("ab")).not.toBeInTheDocument();
    });
    expect(inputNode.value).toBe("ab");
  });

  it("should provide keyboard support", async () => {
    render(<AutoComplete {...testProps} />);
    const inputNode = screen.getByPlaceholderText(
      "autoComplete"
    ) as HTMLInputElement;
    fireEvent.change(inputNode, { target: { value: "a" } });
    // 因为在 AutoComplete 的输入中加了防抖，所以要过一小段时间下拉菜单才会出现
    await waitFor(() => {
      expect(screen.getByText("ab")).toBeInTheDocument();
    });
    const firstResult = screen.queryByText("ab");
    const secondResult = screen.queryByText("abc");

    // down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).toHaveClass("rui-autoComplete-item");
    // down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(secondResult).toHaveClass("rui-autoComplete-item");
    // up
    fireEvent.keyDown(inputNode, { keyCode: 38 });
    expect(firstResult).toHaveClass("rui-autoComplete-item");
    // enter
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith("ab");
    expect(inputNode.value).toBe("ab");
    await waitFor(() => {
      expect(screen.queryByText("ab")).not.toBeInTheDocument();
    });
  });

  it("should hide the dropdown if clicking outside", async () => {
    render(<AutoComplete {...testProps} />);
    const inputNode = screen.getByPlaceholderText(
      "autoComplete"
    ) as HTMLInputElement;
    fireEvent.change(inputNode, { target: { value: "a" } });
    // 因为在 AutoComplete 的输入中加了防抖，所以要过一小段时间下拉菜单才会出现
    await waitFor(() => {
      expect(screen.getByText("ab")).toBeInTheDocument();
    });
    fireEvent.click(document);
    await waitFor(() => {
      expect(screen.queryByText("ab")).not.toBeInTheDocument();
    });
  });
});
