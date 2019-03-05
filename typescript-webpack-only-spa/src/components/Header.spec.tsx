import { configure, mount, shallow } from "enzyme";
import * as React from "react";
import { Header } from "./Header";

describe("Header", () => {
  const header = mount(<Header text="Test" />);

  it("should have h1", () => {
    expect(header.find("h1").length).toBe(1);
  });

  it("should have correct title", () => {
    expect(header.find("h1").text()).toBe("Test");
  });
});
