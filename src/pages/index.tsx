import * as React from "react"
import type { NextPage } from 'next'
import Head from 'next/head'
import { toAscii } from "../libs/directory"

const Home: NextPage = () => {
  const ref = React.useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = React.useState("")
  const [tabSize, setTabSize] = React.useState<number>(2)

  const preview = toAscii(value)

  React.useEffect(() => {
    const element = ref.current
    function _action(event: KeyboardEvent) { 
      if (event.key === "Tab") {
        event.preventDefault()
        if (element != null) {
          const val = element.value
          const start = element.selectionStart
          const end = element.selectionEnd

          element.value = val.substring(0, start) + '\t' + val.substring(end)
          element.selectionStart = element.selectionEnd = start + 1

          setValue(element.value)
        }

      }
    }
    element?.addEventListener("keydown", _action)
    return () => {
      element?.removeEventListener("keydown", _action)
    }
  }, [])

  function onChange(event: React.FormEvent<HTMLTextAreaElement>) {
    setValue(event.currentTarget.value)
  }

  return (
    <>
      <Head>
        <title>Directory to ASCII </title>
        <meta name="description" content="Convert directory structure to ASCII" />
        <link rel="icon" href="/directory-tree.ico" />
      </Head>
      <div style={{display: "flex"}}>
        <textarea onChange={onChange} style={{tabSize, fontFamily: "monospace"}} ref={ref} value={value}></textarea>
        <pre>{preview}</pre>
      </div>
      <div>
        <label>
          Tab size
          <input type="number" onChange={event => setTabSize(Number(event.currentTarget.value))} defaultValue={tabSize} />
        </label>
      </div>
    </>
  )
}

export default Home

// src/
//   libs/
//     directory.test.ts
//     directory.ts
// 	pages/
//     _app.tsx
// 		index.tsx
// .eslintrc.json
// .prettierrc
// jest.config.js
// next.config.js
// package.json
// README.md
// tsconfig.json
