import { Calc } from "./Calc";

describe("add", () => {
    const calc = new Calc();
    it("should add two numbers", () => {
        expect(calc.add(2, 2)).toBe(4);
    });
});
