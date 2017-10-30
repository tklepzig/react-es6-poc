import { Header } from "./Header";
import { mount, configure, shallow } from "enzyme";
import * as React from "react";

describe("Header", () => {
    it("should work", () => {
        const header = mount(<Header text="Test" />);
        expect(header.find("h1").text()).toBe("Test");
    });
});