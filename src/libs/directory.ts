type Config = {
	tabSize: number
}

export function toAscii(directory: string, config: Config = {tabSize: 2}): string {
	const lines = directory.split("\n")
	const result = lines.map(line => {
		const startingSpaceCount = Number(line.match(/^ +/g)?.[0].length ?? 0)
		const tabsToInsert = startingSpaceCount / config.tabSize
		const tabLine = "\t".repeat(tabsToInsert) + line.replace(" ".repeat(startingSpaceCount), "")
		return replaceLast(tabLine, "\t", " ├─ ").replace(/^ +/g, "").replaceAll("\t", " │ ").trim()
	}).join("\n")

	return result
}

function replaceLast(subject: string, searchValue: string, replaceValue: string) {
	const lastFoundIndex = subject.lastIndexOf(searchValue)
	if (lastFoundIndex === -1) return subject
	return subject.substring(0, lastFoundIndex) + replaceValue + subject.substring(lastFoundIndex + 1, subject.length)
}
