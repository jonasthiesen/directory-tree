import {describe, it, expect} from "@jest/globals"
import {toAscii} from "./directory"

describe("directory", () => {
	it("converts a very simple tree", () => {
		const given =
			"src/\n" + 
			"\tindex.ts"

		const result =
			"src/\n" +
			"├─ index.ts"
		expect(
			toAscii(given)
		).toEqual(
			result
		)
	})

	it("converts a more complex tree", () => {
		const given =
			"src/\n" + 
			"\tpages/\n" +
			"\t\tindex.ts"

		const result =
			"src/\n" +
			"├─ pages/\n" +
			"│  ├─ index.ts"
		expect(
			toAscii(given)
		).toEqual(
			result
		)
	})

	it("converts a much more complex tree", () => {
		const given =
			"src/\n" +
			"\tpages/\n" +
			"\t\tapi/\n" +
			"\t\t\tindex.ts\n" +
			"\t\t_app.ts\n" +
			"\t\tindex.ts\n" +
			"\tutils/\n" +
			"\t\tstring.test.ts\n" +
			"\t\tstring.ts\n" +
			".prettierrc"

		const result =
			"src/\n" +
			"├─ pages/\n" +
			"│  ├─ api/\n" +
			"│  │  ├─ index.ts\n" +
			"│  ├─ _app.ts\n" +
			"│  ├─ index.ts\n" +
			"├─ utils/\n" +
			"│  ├─ string.test.ts\n" +
			"│  ├─ string.ts\n" +
			".prettierrc"
		expect(
			toAscii(given)
		).toEqual(
			result
		)
	})

	it("also works with spaces", () => {
		const given =
			"src/\n" + 
			"  pages/\n" +
			"    index.ts"

		const result =
			"src/\n" +
			"├─ pages/\n" +
			"│  ├─ index.ts"
		expect(
			toAscii(given)
		).toEqual(
			result
		)
	})
})
