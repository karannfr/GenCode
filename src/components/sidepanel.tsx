import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../api/axiosInstance';
import { useState,useEffect} from 'react';
import toast from 'react-hot-toast';
const SidePanel = () => {
    const navigate=useNavigate();
    interface questionFormat{ _id: string;
        title: string;
        status: 'solved' | 'unsolved' };
  const [searchText,setSearchText]=useState("");
  const [allQuestions,setAllQuestions]=useState<questionFormat[]>([]);
  
  useEffect(() => {
  const fetchQuestions = async () => {
    try {
     const response = await axiosPrivate.get("/question");
     if (response.status === 200) {
            toast.success("Questions fetched!");
            setAllQuestions(response.data.questions);
      }
    } catch (err: any) {
      console.error('Error fetching questions:', err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };
  fetchQuestions();
}, []);

const filteredQuestions = allQuestions.filter((q) =>
  q.title.toLowerCase().includes(searchText.toLowerCase())
);

  let questionsDiv = filteredQuestions.map((value, index) => {
    return (
      <>
        <div
          className={`${
            value.status==="solved" ? "bg-green-500" : "bg-red-500"
          } rounded-[7.79px] w-full h-full cursor-pointer`}
        >
          <div className="bg-[#0E1116] rounded-[7.79px] w-[99%] h-full">
            <button className="bg-[rgba(116,128,255,0.2)] text-[#FFFFFF80] px-3 py-2 w-full h-full text-left rounded-[7.79px] hover:bg-[rgba(116,128,255,0.8)]" onClick={()=>{navigate(`/question/${value._id}`)}}>
              {index + 1}. {value.title}
            </button>
          </div>
        </div>
      </>
    );
  });
  return (
    <div className="w-auto h-full p-[1px] bg-gradient-to-b from-[#562EE7] to-[#FFC6E8] rounded-xl">
      <div className="bg-[#0E1116] h-full w-full rounded-xl">
        <div className="flex flex-col items-center p-[12px] rounded-xl gap-[23px]">
          {/* Search bar */}
          <div className="relative w-full py-2 flex flex-row">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <img src="/Vector.svg" alt="" className="h-5 w-5 object-cover" />
            </span>
            <input
              type="text"
              value={searchText}
              onChange={(e)=>{setSearchText(e.target.value)}}
              placeholder="Search Questions"
              className="w-full pl-10 pr-4 py-2 rounded-[7.79px] border-none text-[#FFFFFF80] placeholder-[#FFFFFF80] bg-[rgba(116,128,255,0.2)] hover:bg-[rgba(116,128,255,0.8)]"
            />
          </div>
          <div className="flex flex-col gap-[12px] w-full max-h-[75vh] overflow-y-scroll"  style={{scrollbarWidth: 'none'}}>
            {allQuestions ? questionsDiv : `No questions found\n Generate some by searching!`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
