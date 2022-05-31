import * as React from "react"
import type { NextPage } from 'next'
import { Tooltip } from "../components/tooltip"

const Example: NextPage = () => {
	return (
		<Tooltip label="I do something">
			<button>Button</button>
		</Tooltip>
	)
}

export default Example

