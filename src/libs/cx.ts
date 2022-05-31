type StylesConfig = string | [boolean, string] | [boolean, string, string]

export default function cx(...stylesConfig: StylesConfig[]) {
	const styles = stylesConfig.map(styleConfig => {
		if (typeof styleConfig === "string") {
			return styleConfig
		} else if (Array.isArray(styleConfig) && styleConfig.length === 2) {
			return styleConfig[0] ? styleConfig[1] : null
		} else if (Array.isArray(styleConfig) && styleConfig.length === 3) {
			return styleConfig[0] ? styleConfig[1] : styleConfig[2]
		} else {
			throw new Error(`Invalid style config: ${styleConfig}`)
		}
	}).filter(item => item != null).join(" ")

	return styles
}
