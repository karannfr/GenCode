import { div } from "motion/react-client";
import Hints from "./hints";

type QuestionProps = {
  activeTab: string,
  question: {
    _id: string;
    title: string;
    promptUsed: string;
    description: string;
    constraints: string[];
    examples: {
        input: string;
        output: string;
        explanation: string;
        _id: string;
    }[];
    testCases: {
        input: string;
        output: string;
        _id: string;
    }[];
    hints: string[];
    solution: string;
    user: string;
    status: string;
    createdAt: string;
    __v: number;
  },
  submissions: {
    _id: string;
    user: string;
    question: string;
    code: string;
    language: string;
    passed: boolean;
    testResults: {
        input: string;
        expected: string;
        stdout: null;
        status: string;
        passed: boolean;
        _id: string;
    }[];
    submittedAt: string;
    __v: number;
  }[] | null
}

const Question = ({activeTab,question,submissions} : QuestionProps) => {
  return (
    <div className='text-white p-4 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-[#4a3aff80] scrollbar-track-transparent'>
          {activeTab === 'description' && (
            <div className='flex flex-col gap-9 '>
              <div>
                <h1 className='text-4xl font-bold mb-2'>{question.title}</h1>
                <p>{question.description}</p>
              </div>
              <div>
                <h2 className='font-semibold mb-2'>Constraints</h2>
                <ul className='list-disc list-inside pl-4 text-white/80'>
                  {question.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className='font-semibold mb-2'>Examples</h2>
                <div className='flex flex-col gap-3'>
                  {question.examples.map((ex, i) => (
                    <div key={i} className='p-3 rounded bg-[#4a3affd0]'>
                      <div><strong>Input:</strong> {ex.input}</div>
                      <div><strong>Output:</strong> {ex.output}</div>
                      <div><strong>Explanation:</strong> {ex.explanation}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className='font-semibold text-lg mb-4'>Hints</h2>
                <div className='flex flex-col gap-4'>
                  {question.hints.map((hint, i) => (
                    <Hints hint={hint} i={i}/>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'solution' && (
            <div>
              <h2 className='font-semibold mb-2'>Solution</h2>
              <pre className='bg-[#1E1E1E] p-4 rounded whitespace-pre-wrap overflow-x-auto'>
                {question.solution}
              </pre>
            </div>
          )}
          {activeTab === 'submissions' && (
            <div className='flex flex-col gap-4'> 
              { !submissions ? <div>No Submissions Yet</div> : submissions.map((sub) => {
                const firstFailed = sub.testResults.find(t => !t.passed);
                return (
                  <div
                    key={sub._id}
                    className={`p-4 rounded-lg bg-[#4a3affd0]  text-white flex flex-col gap-3 border-r-4 ${
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
  )
}

export default Question