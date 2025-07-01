import Split from 'react-split'
import memoji from '../assets/memoji.png'
import Editor from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { useRef, useState,useEffect } from 'react'
import { FaAngleDown, FaAngleUp} from "react-icons/fa6";
import { useParams } from 'react-router-dom'

const Question = () => {
  useEffect(() => {
    const id = useParams()
    const token = localStorage.getItem('token') 
    const authorization = "Bearer "+token

  },[])
  const submissions = [
    {
      "_id": "68642b5d0e0551bf0dc88058",
      "user": "686429800e0551bf0dc88012",
      "question": "68642a600e0551bf0dc88020",
      "code": "N = int(input())\nfor i in range(1, N + 1):\n    print('*' * i)",
      "language": "python",
      "passed": false,
      "testResults": [
        {
          "input": "[\"a\", \"b\", \"c\", \"a\", \"b\", \"a\"]",
          "expected": "[\"a\", \"b\"]",
          "stdout": null,
          "status": "Runtime Error (NZEC)",
          "passed": false,
          "_id": "68642b5d0e0551bf0dc88059"
        },
        {
          "input": "[\"foo\", \"bar\", \"baz\", \"foo\", \"qux\", \"bar\", \"foo\"]",
          "expected": "[\"bar\", \"foo\"]",
          "stdout": null,
          "status": "Runtime Error (NZEC)",
          "passed": false,
          "_id": "68642b5d0e0551bf0dc8805a"
        },
        {
          "input": "[\"unique\", \"unique\", \"unique\"]",
          "expected": "[\"unique\"]",
          "stdout": null,
          "status": "Runtime Error (NZEC)",
          "passed": false,
          "_id": "68642b5d0e0551bf0dc8805b"
        },
        {
          "input": "[\"single_item\"]",
          "expected": "[]",
          "stdout": null,
          "status": "Runtime Error (NZEC)",
          "passed": false,
          "_id": "68642b5d0e0551bf0dc8805c"
        },
        {
          "input": "[\"test\", \"TEST\", \"Test\", \"test\"]",
          "expected": "[\"test\"]",
          "stdout": null,
          "status": "Runtime Error (NZEC)",
          "passed": false,
          "_id": "68642b5d0e0551bf0dc8805d"
        }
      ],
      "submittedAt": "2025-07-01T18:39:25.759Z",
      "__v": 0
    },
    {
      "_id": "68642b5d0e0551bf0dc88058",
      "user": "686429800e0551bf0dc88012",
      "question": "68642a600e0551bf0dc88020",
      "code": "N = int(input())\nfor i in range(1, N + 1):\n    print('*' * i)",
      "language": "python",
      "passed": false,
      "testResults": [
        {
          "input": "[\"a\", \"b\", \"c\", \"a\", \"b\", \"a\"]",
          "expected": "[\"a\", \"b\"]",
          "stdout": null,
          "status": "Runtime Error (NZEC)",
          "passed": false,
          "_id": "68642b5d0e0551bf0dc88059"
        },
        {
          "input": "[\"foo\", \"bar\", \"baz\", \"foo\", \"qux\", \"bar\", \"foo\"]",
          "expected": "[\"bar\", \"foo\"]",
          "stdout": null,
          "status": "Runtime Error (NZEC)",
          "passed": false,
          "_id": "68642b5d0e0551bf0dc8805a"
        },
        {
          "input": "[\"unique\", \"unique\", \"unique\"]",
          "expected": "[\"unique\"]",
          "stdout": null,
          "status": "Runtime Error (NZEC)",
          "passed": false,
          "_id": "68642b5d0e0551bf0dc8805b"
        },
        {
          "input": "[\"single_item\"]",
          "expected": "[]",
          "stdout": null,
          "status": "Runtime Error (NZEC)",
          "passed": false,
          "_id": "68642b5d0e0551bf0dc8805c"
        },
        {
          "input": "[\"test\", \"TEST\", \"Test\", \"test\"]",
          "expected": "[\"test\"]",
          "stdout": null,
          "status": "Runtime Error (NZEC)",
          "passed": false,
          "_id": "68642b5d0e0551bf0dc8805d"
        }
      ],
      "submittedAt": "2025-07-01T18:39:25.759Z",
      "__v": 0
    }
  ]
  const question = {
    "message": "Question retrieved successfully.",
    "question": {
      "_id": "68642a600e0551bf0dc88020",
      "title": "Duplicate String Identifier",
      "promptUsed": "Find Duplicates in an array of strings",
      "description": "Given an array of strings, identify and return all strings that appear more than once. The output should be a list of these duplicate strings, sorted alphabetically. Each duplicate string should appear only once in the output list. The comparison is case-sensitive.",
      "constraints": [
        "1 <= N <= 10^5 (where N is the number of strings in the input array)",
        "1 <= L <= 50 (where L is the length of each string)",
        "Each string consists of ASCII characters (printable characters, decimal 32-126)",
        "The total length of all strings combined will not exceed 5 * 10^6 characters."
      ],
      "examples": [
        {
          "input": "[\"apple\", \"banana\", \"apple\", \"orange\", \"banana\"]",
          "output": "[\"apple\", \"banana\"]",
          "explanation": "The string \"apple\" appears 2 times and \"banana\" appears 2 times. \"orange\" appears only once. The duplicates are \"apple\" and \"banana\". When sorted alphabetically, the result is [\"apple\", \"banana\"].",
          "_id": "68642a600e0551bf0dc88021"
        },
        {
          "input": "[\"cat\", \"dog\", \"mouse\", \"cat\", \"dog\", \"cat\"]",
          "output": "[\"cat\", \"dog\"]",
          "explanation": "The string \"cat\" appears 3 times and \"dog\" appears 2 times. \"mouse\" appears only once. The duplicates are \"cat\" and \"dog\". When sorted alphabetically, the result is [\"cat\", \"dog\"].",
          "_id": "68642a600e0551bf0dc88022"
        },
        {
          "input": "[\"hello\", \"world\", \"Hello\"]",
          "output": "[]",
          "explanation": "Although \"hello\" and \"Hello\" are similar, the comparison is case-sensitive, so they are treated as distinct strings. Neither appears more than once, thus no duplicates are found.",
          "_id": "68642a600e0551bf0dc88023"
        }
      ],
      "testCases": [
        {
          "input": "[\"a\", \"b\", \"c\", \"a\", \"b\", \"a\"]",
          "output": "[\"a\", \"b\"]",
          "_id": "68642a600e0551bf0dc88024"
        },
        {
          "input": "[\"foo\", \"bar\", \"baz\", \"foo\", \"qux\", \"bar\", \"foo\"]",
          "output": "[\"bar\", \"foo\"]",
          "_id": "68642a600e0551bf0dc88025"
        },
        {
          "input": "[\"unique\", \"unique\", \"unique\"]",
          "output": "[\"unique\"]",
          "_id": "68642a600e0551bf0dc88026"
        },
        {
          "input": "[\"single_item\"]",
          "output": "[]",
          "_id": "68642a600e0551bf0dc88027"
        },
        {
          "input": "[\"test\", \"TEST\", \"Test\", \"test\"]",
          "output": "[\"test\"]",
          "_id": "68642a600e0551bf0dc88028"
        }
      ],
      "hints": [
        "Consider using a hash map (dictionary in Python) to efficiently store and count the occurrences of each string.",
        "After counting, iterate through your counts to identify strings with a frequency greater than one.",
        "Ensure your final list of duplicate strings is sorted alphabetically before returning."
      ],
      "solution": "import collections\n\ndef find_duplicate_strings(strings):\n    counts = collections.Counter(strings)\n    duplicate_list = []\n    for s, count in counts.items():\n        if count > 1:\n            duplicate_list.append(s)\n    duplicate_list.sort()\n    return duplicate_list\n",
      "user": "686429800e0551bf0dc88012",
      "status": "unsolved",
      "createdAt": "2025-07-01T18:35:12.674Z",
      "__v": 0
    }
  }
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const [activeTab, setActiveTab] = useState('description')
  const languageSamples: Record<string,string> = {
    python: `# Python sample\nprint("Hello, Python!")`,
    java: `// Java sample\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}`,
    c: `// C sample\n#include <stdio.h>\n\nint main() {\n  printf("Hello, C!\\n");\n  return 0;\n}`,
    cpp: `// C++ sample\n#include <iostream>\n\nint main() {\n  std::cout << "Hello, C++!" << std::endl;\n  return 0;\n}`
  }

  const [language, setLanguage] = useState('python')
  const [code, setCode] = useState(languageSamples[language])
  const [dropdown, setDropdown] = useState(false)

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
  }

  const getEditorValue = () => {
    if (editorRef.current) {
      const value = editorRef.current.getValue() 
    }
  }

  return (
    <div className='flex flex-col h-screen'>
      <nav className='text-white mx-4 my-2 flex justify-between items-center'>
        <div>Questions</div>
        <img src={memoji} alt="" className='h-12'/>
      </nav>
      <Split className="split flex-1" minSize={0} gutterSize={4}>
        <div className='my-2 ml-2 mr-1 border border-[#4a3aff4f] rounded-lg flex flex-col flex-1'>
        <nav className='flex flex-row text-white w-full px-4 py-4 gap-4'>
          <div
            className={`px-4 py-2 cursor-pointer rounded ${activeTab === 'description' ? 'bg-[#4a3aff4f]' : 'hover:bg-[#4a3aff4f]'}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </div>
          <div
            className={`px-4 py-2 cursor-pointer rounded ${activeTab === 'submissions' ? 'bg-[#4a3aff4f]' : 'hover:bg-[#4a3aff4f]'}`}
            onClick={() => setActiveTab('submissions')}
          >
            Submissions
          </div>
          <div
            className={`px-4 py-2 cursor-pointer rounded ${activeTab === 'solution' ? 'bg-[#4a3aff4f]' : 'hover:bg-[#4a3aff4f]'}`}
            onClick={() => setActiveTab('solution')}
          >
            Solution
          </div>
        </nav>

        <div className='text-white p-4 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-[#4a3aff80] scrollbar-track-transparent'>
          {activeTab === 'description' && (
            <div className='flex flex-col gap-9 '>
              <div>
                <h1 className='text-4xl font-bold mb-2'>{question.question.title}</h1>
                <p>{question.question.description}</p>
              </div>

              <div>
                <h2 className='font-semibold mb-2'>Constraints</h2>
                <ul className='list-disc list-inside pl-4 text-white/80'>
                  {question.question.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className='font-semibold mb-2'>Examples</h2>
                <div className='flex flex-col gap-3'>
                  {question.question.examples.map((ex, i) => (
                    <div key={i} className='p-3 rounded bg-[#7480ff79]'>
                      <div><strong>Input:</strong> {ex.input}</div>
                      <div><strong>Output:</strong> {ex.output}</div>
                      <div><strong>Explanation:</strong> {ex.explanation}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className='font-semibold mb-2'>Hints</h2>
                <ul className='list-disc list-inside pl-4 text-white/80'>
                  {question.question.hints.map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'solution' && (
            <div>
              <h2 className='font-semibold mb-2'>Solution</h2>
              <pre className='bg-[#1E1E1E] p-4 rounded whitespace-pre-wrap overflow-x-auto'>
                {question.question.solution}
              </pre>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className='flex flex-col gap-4'>
              {submissions.map((sub) => {
                const firstFailed = sub.testResults.find(t => !t.passed);
                return (
                  <div
                    key={sub._id}
                    className={`p-4 rounded-lg bg-[#7480FF66] text-white flex flex-col gap-3 border-r-4 ${
                      sub.passed ? 'border-green-500' : 'border-red-500'
                    }`}
                  >
                    <div className='flex justify-between items-center'>
                      <div className='text-sm text-white/70'>
                        Submitted: {new Date(sub.submittedAt).toLocaleString()}
                      </div>
                      <div
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          sub.passed ? 'bg-green-700' : 'bg-red-700'
                        }`}
                      >
                        {sub.passed ? 'Passed' : 'Failed'}
                      </div>
                    </div>

                    <div>
                      <h2 className='font-semibold text-lg'>Language: {sub.language.toUpperCase()}</h2>
                      <pre className='bg-[#1E1E1E] mt-2 p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap'>
                        {sub.code}
                      </pre>
                    </div>

                    {!sub.passed && firstFailed && (
                      <div className='bg-[#2e2e2e] rounded p-3 border-l-4 border-red-500'>
                        <h3 className='text-md font-semibold mb-1'>Sample Failed Test</h3>
                        <div><strong>Input:</strong> {firstFailed.input}</div>
                        <div><strong>Expected:</strong> {firstFailed.expected}</div>
                        <div><strong>Status:</strong> {firstFailed.status}</div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

        </div>

        </div>

        <Split className="ml-1 mr-2 my-2 max-h-full flex flex-col gap-1" direction="vertical" minSize={0} gutterSize={4}>
          <div className='bg-[#1E1E1E] rounded-lg flex flex-col gap-2'>
            <div className='px-4 py-2 text-white/40 flex items-center gap-2 cursor-pointer' onClick={() => setDropdown(prev => !prev)}>{language.toUpperCase()}   <FaAngleDown/></div>
            {dropdown &&
              <div className='w-44 z-10 p-4 absolute top-30 bg-[#424242] text-white flex flex-col gap-2 rounded-xl'>
                <div className='cursor-pointer' onClick={() => {setLanguage('python'); setDropdown(false); setCode(languageSamples['python'])}}>Python</div>
                <div className='cursor-pointer' onClick={() => {setLanguage('java'); setDropdown(false); setCode(languageSamples['java'])}}>Java</div>
                <div className='cursor-pointer' onClick={() => {setLanguage('c'); setDropdown(false); setCode(languageSamples['c'])}}>C</div>
                <div className='cursor-pointer' onClick={() => {setLanguage('cpp'); setDropdown(false); setCode(languageSamples['cpp'])}}>C++</div>
              </div>
            } 
            <div className='flex-1 rounded-b-lg overflow-hidden'>
              <Editor
                language={language === 'c' ? 'c' : language}
                value={code}
                theme="vs-dark"
                onMount={handleEditorDidMount}
                height="100%"
                className="flex"
              />
            </div>
          </div>
          <div className='bg-blue-700 rounded-lg p-2 text-white ,a'>
          </div>
        </Split>
      </Split>
    </div>
  )
}

export default Question


