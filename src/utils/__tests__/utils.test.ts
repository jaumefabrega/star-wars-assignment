import { parseUnknowableNumber } from "utils/utils";

// Simple and non-exhaustive unit tests sample
describe("utils", () => {
  describe("parseUnknowableNumber", () => {
    it("should correctly parse integers", () => {
      const num = parseUnknowableNumber("3");
      expect(num).toEqual(3);
    });

    it("should correctly parse floats", () => {
      const num = parseUnknowableNumber("6.72");
      expect(num).toEqual(6.72);
    });

    it("should correctly parse negative numbers", () => {
      const intNum = parseUnknowableNumber("-9");
      expect(intNum).toEqual(-9);

      const floatNum = parseUnknowableNumber("-2.1");
      expect(floatNum).toEqual(-2.1);
    });

    it("should correctly parse numbers with thousands separator", () => {
      const num = parseUnknowableNumber("10,925");
      expect(num).toEqual(10925);
    });

    it("should return 'unknown' for NaN values", () => {
      const invalidNums = ["abc", "q3t4", ""];
      invalidNums.forEach((num) =>
        expect(parseUnknowableNumber(num)).toEqual("unknown")
      );
    });

    it("should return 'unknown' for the string 'unknown'", () => {
      const unknown = parseUnknowableNumber("unknown");
      expect(unknown).toEqual("unknown");
    });
  });
});
