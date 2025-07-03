import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignUpModal";
import { useEffect, useState } from "react";
import memoji from "../assets/memoji.png";
import SidePanel from "../components/sidepanel";
import { axiosPrivate } from "../api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/Statusbar";
type HomeProps = {
  logged: boolean;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
};

const Home = ({ logged, setLogged }: HomeProps) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [signup, setSignUp] = useState(false);
  const [profile, setProfile] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [stats, setStats] = useState<{
    totalQuestions: number;
    solvedQuestions: number;
    languagesUsed: Record<string, number>;
  }| null>(null);
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && prompt.trim()) {
      try {
        const response = await axiosPrivate.post("/generate", {
          input: prompt,
        });
        if (
          (response.status === 200 || response.status === 201) &&
          response.data.id
        ) {
          toast.success("Question generated!");
          navigate(`/question/${response.data.id}`);
        }
      } catch (err: any) {
        console.error("Error generating question:", err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      }
    }
  };



  return (
    <>
    {/* Inside your return block */}
        <div className="w-screen h-screen overflow-hidden">
          <div
            className={`h-full w-full p-6 ${
              logged
                ? "flex flex-row gap-[13px]"
                : "flex flex-col justify-between items-center"
            }`}
          >
            {/* Side Panel only when logged in */}
            {logged && (
              <div className="w-[20vw] h-full">
                <SidePanel />
              </div>
            )}

            {/* Main Section */}
            <div className="h-full w-full p-[1px] bg-gradient-to-br from-[#562EE7] via-[#8E56FF] to-[#FFC6E8] rounded-lg">
              <div className="bg-[#010314] h-full w-full rounded-lg flex flex-col">
                
                {logged && (
          <div className="w-full flex items-center justify-between px-6 pt-4">
            {/* StatusBar on the left */}
            <div className="max-w-[50%] w-full">
              <StatusBar totalGenerated={5} totalSolved={10} />
            </div>

            {/* Logout on the right */}
            <button
              className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition"
              onClick={() => {
                localStorage.removeItem("accessToken");
                setLogged(false);
              }}
            >
              Logout
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center items-center w-full relative">
          {/* Top Buttons for non-logged users */}
          {!logged ? (
            <div className="absolute top-6 right-10 flex flex-row gap-6 z-10">
              <div className="p-[2px] rounded-lg bg-gradient-to-r from-[#562EE7] to-[#FFC6E8] hover:shadow-lg transition">
                <button
                  className="px-6 py-2 text-white text-[1.2rem] bg-[#0E1116] rounded-lg w-full h-full hover:bg-gray-900 transition"
                  onClick={() => setLogin(true)}
                >
                  Login
                </button>
              </div>
              <div className="p-[2px] rounded-lg bg-gradient-to-r from-[#FFC6E8] to-[#562EE7] hover:shadow-lg transition">
                <button
                  className="px-4 py-2 text-white text-[1.2rem] bg-[#0E1116] rounded-lg w-full h-full hover:bg-gray-900 transition"
                  onClick={() => setSignUp(true)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          ) : (
            <img src={memoji} alt="" className="" />
          )}

          {/* Middle Content */}
          <div className="flex flex-col gap-6 justify-center items-center text-center max-w-[90%] lg:max-w-[60%] text-white px-4">
            {!logged ? (
              <>
                <h1 className="text-[2.5rem] sm:text-[3.0rem] font-bold leading-snug tracking-tight text-white drop-shadow">
                  From prompt to problem — instantly
                </h1>
                <p className="text-[1.2rem] sm:text-[1.2rem] font-light text-white/80 leading-relaxed">
                  CodeGen is your AI-powered coding companion — whether you're a student, problem setter, or just learning to think like a developer. Simply describe the type of question you want, and CodeGen will instantly generate a fully testable coding problem — complete with constraints, sample input/output, and submission-ready testcases.
                </p>

                {/* Features */}
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="rounded-full border border-white text-md font-semibold px-6 py-3 hover:bg-white hover:text-black transition duration-200 shadow-sm">
                    GENERATE QUESTIONS INSTANTLY
                  </div>
                  <div className="rounded-full border border-white text-md font-semibold px-6 py-3 hover:bg-white hover:text-black transition duration-200 shadow-sm">
                    RUN CODE & CHECK OUTPUT
                  </div>
                  <div className="rounded-full border border-white text-md font-semibold px-6 py-3 hover:bg-white hover:text-black transition duration-200 shadow-sm">
                    SAVE FOR LATER
                  </div>
                </div>
              </>
            ) : (
              <h2 className="text-2xl sm:text-4xl font-medium text-white drop-shadow-lg">
                Ready to generate your next problem?
              </h2>
            )}

            {/* Input */}
            <div className="w-full max-w-3xl">
              <input
                type="text"
                value={prompt}
                placeholder="Enter your question here ..."
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 
                rounded-full focus:outline-none focus:ring-2 focus:ring-[#7480FF] 
                transition-all duration-300 text-xl shadow-inner"
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  {/* Modals */}
  {login && (
    <LoginModal
      setLogin={setLogin}
      setSignUp={setSignUp}
      setLogged={setLogged}
    />
  )}
  {signup && <SignUpModal setLogin={setLogin} setSignUp={setSignUp} />}
      </>
    );
  };

export default Home;
