import Split from 'react-split'
import memoji from '../assets/memoji.png'
import Editor from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { useRef, useState, useEffect } from 'react'
import { FaAngleDown, FaPlay, } from "react-icons/fa6";
import { MdCloudUpload } from "react-icons/md";
import IOFields from '../components/IOFields'
import logo from '../assets/GenCode.png'
import { Link } from 'react-router-dom'
import Question from '../components/Question'
import axiosInstance,{axiosPrivate} from '../api/axiosInstance'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import LoadingCircleSpinner from '../components/LoadingCircleSpinner'
import ResultCards from '../components/ResultCards'
import { IoReload } from "react-icons/io5";

const QuestionPage = () => {
  const {id} = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [question,setQuestion] = useState<{
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
  } | null>(null)
  const [submissions,setSubmissions] = useState<{
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
  }[] | null>(null);
  useEffect( () => {
    const refresh = async () => {
      const response = await axiosInstance.get('/refresh')
      if(response.status == 200)
        localStorage.setItem('accessToken', response.data.accessToken)
    }
    refresh()
    setTimeout(async() => {
      const response = await axiosInstance.get('/refresh')
      if(response.status == 200)
        localStorage.setItem('accessToken', response.data.accessToken)
    },1000 * 60 * 7)
  },[])
  useEffect( () => {
    const getValues = async() => {
      let response = await axiosPrivate.get(`/question/${id}`)
      setIsLoading(false)
      if(response.status === 200)
      setQuestion(response.data.question)
      else
        return 
      response = await axiosPrivate.get(`/submit/${id}`)
      if(response.status === 200)
        setSubmissions(response.data.submissions)
    }
    getValues()
  },[])
  const [stdin, setStdin] = useState("");
  const [stdout, setStdout] = useState("Output will appear here...");
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
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<{input: string,expected: string, stdout:string, status: string, passed:boolean}[] | null>(null)

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
  }

  const runCode = async() => {
    try{
    setIsRunning(true)
    const value = editorRef.current?.getValue();
    const response = await axiosPrivate.post('/run', {
      language : language.toLowerCase(),
      code : value,
      input : stdin,
      questionID : id
    })
    setIsRunning(false)
    if(response.status == 200)
      setStdout(response.data.results.stdout)
    else
      toast.error(response.data.message)
  }catch(err : any){
    console.error(err)
    toast.error(err?.response?.data?.message || err)
    setIsRunning(false)
  }
  };

  const submitCode = async() => {
    try{
    setIsRunning(true)
    const value = editorRef.current?.getValue();
    const response = await axiosPrivate.post('/submit', {
      language : language.toLowerCase(),
      code : value,
      questionID : id
    })
    setIsRunning(false)
    if(response.status == 200)
      setResults(response.data.results)
    else
      toast(response.data.message)
  }catch(err : any){
    console.error(err)
    toast.error(err?.response?.data?.message || err)
    setIsRunning(false)
  }
  };

  return (
    isLoading ? <div className='border-[#4a3aff4f] border rounded-lg p-2 flex items-center justify-center'><LoadingCircleSpinner/></div> : !question ? <div className='text-purple-600 font-bold text-xl'>Question Not Found</div> :
    <div className='flex flex-col h-screen'>
      <nav className='text-white mx-4 my-2 flex justify-between items-center'>
        <Link to='/'><img src={logo} alt="" /></Link>
        <img src={memoji} alt="" className='h-12'/>
      </nav>
      <Split className="split h-[92%]" minSize={0} gutterSize={4}>
        <div className='my-2 ml-2 mr-1 border border-[#4a3aff4f] rounded-lg flex flex-col flex-1 h-full'>
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
        <Question activeTab={activeTab} question={question} submissions={submissions}/>
        </div>
        <Split className="ml-1 mr-2 my-2 h-full flex flex-col gap-1" direction="vertical" minSize={0} gutterSize={4}>
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
          {isRunning ? <div className='border-[#4a3aff4f] border rounded-lg p-2 flex items-center justify-center'><LoadingCircleSpinner/></div> :
          !results ? 
          <div className='border-[#4a3aff4f] border rounded-lg p-2 text-white'>
            <div className='flex gap-2 mx-4 my-2'>
              <button className='flex items-center gap-4 py-2 px-6 rounded bg-[#4a3aff] cursor-pointer hover:bg-[#4a3aff98]' onClick={() => runCode()}>Run <FaPlay/></button>
              <button className='flex items-center gap-4 py-2 px-4 rounded bg-[#4a3aff] cursor-pointer hover:bg-[#4a3aff98]' onClick={() => submitCode()}>Submit <MdCloudUpload/></button>
            </div>
            <div className='mt-8 mx-4'>
              <IOFields stdin={stdin} setStdin={setStdin} stdout={stdout}/>
            </div>
          </div> : 
           <div className='border-[#4a3aff4f] border rounded-lg p-4 max-h-full'>
              <button className='flex items-center gap-4 py-2 px-6 rounded bg-[#4a3aff] cursor-pointer hover:bg-[#4a3aff98] text-white mb-2' onClick={() => setResults(null)}>Reattempt <IoReload/></button>
              <ResultCards results={results}/>
            </div>
          }
        </Split>
      </Split>
    </div>
  )
}

export default QuestionPage


