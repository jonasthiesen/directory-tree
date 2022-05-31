import * as React from "react"
import type { NextPage } from 'next'
import Head from "next/head"
import { toAscii } from "../libs/directory"
import { FaClipboard, FaClipboardCheck } from "react-icons/fa"
import { Tooltip } from "../components/tooltip"
import cx from "../libs/cx"

const Home: NextPage = () => {
  const ref = React.useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = React.useState("src/\n\tpages/\n\t\tapi/\n\t\t\tindex.ts\n\t\t_app.tsx\n\t\tindex.tsx\n\tutils/\n\t\tstring.test.ts\n\t\tstring.ts\n.eslintrc.json\n.prettierrc\nnext.config.json\npackage.json")
  const [tabSize, setTabSize] = React.useState<number>(2)
  const [copySuccess, setCopySuccess] = React.useState(false)

  const preview = toAscii(value)

  React.useEffect(() => {
    const element = ref.current
    if (element != null) {
      element.focus()
      element.selectionStart = element.value.length
    }

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

  function copyToClipboard() {
    navigator.clipboard.writeText(preview).then(() => {
      setCopySuccess(true)
      setTimeout(() => {
        setCopySuccess(false)
      }, 2000)
    })
  }

  return (
    <div className="h-screen w-screen bg-gray-700">
      <Head>
        <title>Directory to ASCII </title>
        <meta name="description" content="Convert directory structure to ASCII" />
        <link rel="icon" href="/directory-tree.ico" />
      </Head>
      <div className="flex flex-col w-full h-full justify-center items-center gap-4">
        <div className="flex h-1/2 w-1/2 shadow-xl text-lg">
          <label className="sr-only" htmlFor="directory">Directory</label>
          <textarea
            id="directory"
            className="font-mono flex-1 bg-gray-800 rounded-xl text-white p-8 resize-none relative"
            onChange={onChange}
            style={{ tabSize }}
            ref={ref}
            value={value}
          ></textarea>
          <pre className="flex-1 text-white py-8 pl-12 pr-8 bg-gray-900 -ml-4 rounded-xl overflow-y-auto">{preview}</pre>
        </div>
        <div className="w-1/2 bg-gray-800 rounded-xl shadow-xl flex items-center p-1 justify-between">
          <label className="text-white ml-2">
            Tab size
            <input type="number" onChange={event => setTabSize(Number(event.currentTarget.value))} defaultValue={tabSize} className="ml-2 bg-gray-700 p-1 rounded-lg w-16" />
          </label>
          <Tooltip label="Copy to clipboard" placement="top">
            <button
              className={cx(
                "text-white bg-gray-800 hover:bg-gray-900 p-3 rounded-xl",
                [copySuccess, "text-green-500", "text-white"]
              )}
              onClick={copyToClipboard}
            >
              {copySuccess ? <FaClipboardCheck /> : <FaClipboard />}
              <span className="sr-only">Copy to clipboard</span>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default Home