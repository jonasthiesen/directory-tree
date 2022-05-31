import {describe, it, expect} from "@jest/globals"
import cx from "./cx"

describe("cx", () => {
	it("combines strings together", () => {
		expect(
			cx("foo", "bar")
		).toEqual("foo bar")
	})

	it("combines string and conditional array [boolean, string]", () => {
		expect(
			cx("foo", [true, "bar"])
		).toEqual("foo bar")

		expect(
			cx("foo", [false, "bar"])
		).toEqual("foo")
	})

	it("combines string and conditional array [boolean, string, string]", () => {
		expect(
			cx("foo", [true, "bar", "baz"])
		).toEqual("foo bar")

		expect(
			cx("foo", [false, "bar", "baz"])
		).toEqual("foo baz")
	})
})