import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignUpModal";
import SidePanel from "../components/sidepanel";
import StatusBar from "../components/Statusbar";
import InputBar from "../components/inputBar";
import { axiosPrivate } from "../api/axiosInstance";
import logo from "../assets/GenCode.png"
type HomeProps = {
  logged: boolean;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
};
const Home = ({ logged, setLogged }: HomeProps) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [signup, setSignUp] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [profile, setProfile] = useState(false);
  const logout = async () => {
    try {
      const response = await axiosPrivate("/logout");
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        setLogged(false);
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed");
    }
  };
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && prompt.trim()) {
      e.preventDefault();
      generateQuestion();
    }
  };

  const generateQuestion = async () => {
    if (logged) {
      if (!prompt.trim()) return;
      try {
        const response = await axiosPrivate.post("/generate", {
          input: prompt,
        });
        if (
          (response.status === 200 || response.status === 201) &&
          response.data.id
        ) {
          toast.success("Question generated!");
          setPrompt("");
          navigate(`/question/${response.data.id}`);
        }
      } catch (err: any) {
        console.error("Error generating question:", err);
        toast.error(err?.response?.data?.message || "Something went wrong");
      }
    } else {
     setSignUp(true);
    }
  };

  const features = [
    {
      title: "Generate Questions",
      desc: "Describe a prompt and watch GenCode bring it to life.",
    },
    {
      title: "Run & Submit",
      desc: "Run your code and test instantly in-browser.",
    },
    {
      title: "Save Progress",
      desc: "Store generated problems and come back later.",
    },
  ];
  return (
    <>
      {!logged ? (
        
        <div className="relative min-h-screen w-full flex items-center justify-center px-4">
           <div
            className="absolute inset-0 pointer-events-none z-[-1]"
            style={{
              background:
                "radial-gradient(circle at top right, #2a2249 0%, transparent 45%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-[-1]"
            style={{
              background:
                "radial-gradient(circle at bottom left, #2a2249 0%, transparent 45%)",
            }}
          />
          
          <div className="absolute top-0 right-0 flex justify-center gap-4 mt-4 mr-4">
                <div className="p-[1px] rounded-lg bg-gradient-to-r from-[#562EE7] to-[#FFC6E8] transition">
                  <button
                    className="px-5 py-1.5 text-white text-sm sm:text-base bg-[#0E1116] rounded-lg hover:bg-[#181B22] transition-all duration-200"
                    onClick={() => setLogin(true)}
                  >
                    Login
                  </button>
                </div>
                <div className="p-[1px] rounded-lg transition bg-gradient-to-r from-[#FFC6E8] to-[#562EE7]">
                  <button
                    className="px-5 py-1.5 text-white text-sm sm:text-base bg-[#0E1116] rounded-lg hover:bg-[#181B22] transition-all duration-200"
                    onClick={() => setSignUp(true)}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
          <div className="rounded-2xl shadow-xl w-full max-w-4xl">
            <div className="bg-[#14161D] rounded-2xl px-6 py-8 sm:px-10 sm:py-10 text-white text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-40">
                  <img
                    src={logo}
                    alt="logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold">
                From prompt to problem — instantly
              </h1>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                GenCode is your AI-powered coding companion — whether you're a
                student, problem setter, or just learning to think like a
                developer. Simply describe the type of question you want, and
                GenCode will instantly generate a fully testable coding problem
                — complete with constraints, sample input/output, and
                submission-ready testcases.
              </p>

              <div className="flex justify-center items-center">
                <div className="flex flex-col sm:flex-row gap-3 text-sm max-w-xl">
                  {features.map(({ title, desc }, i) => (
                    <div
                      key={i}
                      className="bg-[#1F222B] rounded-xl px-4 py-5 text-center space-y-2 shadow-sm hover:shadow-md hover:bg-[#262a35] hover:-translate-y-[2px] transform transition duration-300"
                    >
                      <h2 className="font-semibold text-sm">{title}</h2>
                      <p className="text-gray-400 text-xs">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="max-w-xl mx-auto w-full">
                <InputBar
                  prompt={prompt}
                  setPrompt={setPrompt}
                  logged={logged}
                  generateQuestion={generateQuestion}
                  handleKeyDown={handleKeyDown}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen p-6">
          <div
            className="absolute inset-0 pointer-events-none z-[-1]"
            style={{
              background:
                "radial-gradient(circle at top right, #2a2249 0%, transparent 45%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none z-[-1]"
            style={{
              background:
                "radial-gradient(circle at bottom left, #2a2249 0%, transparent 45%)",
            }}
          />
          <div className="flex gap-[13px] z-10 h-full">
            <div className="flex-1">
              <SidePanel />
            </div>
            <div className="flex-4 flex flex-col py-[10vh] h-full w-full relative">
              <div className="absolute top-0 left-0">
                <StatusBar totalGenerated={10} totalSolved={5} />
              </div>
              <div className="absolute top-0 right-0">
                <button
                  className="text-white/90 text-sm px-4 py-2 rounded-lg border border-white/10 shadow-md hover:bg-[#181B22] transition"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>

              <div className="flex justify-center items-center flex-grow text-white px-4">
                <div className="relative z-10 w-full max-w-3xl bg-[#14161D] rounded-2xl p-6 sm:p-8 shadow-xl">
                  <div className="flex justify-center items-center mb-4">
                    <div className="h-15 w-40">
                      <img
                        src={logo}
                        alt="logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-center mb-2">
                    Ready to generate a question?
                  </h1>
                  <p className="text-center text-white/80 text-sm sm:text-base mb-6 px-2 sm:px-6">
                    Entering a prompt will generate a custom question along with
                    test cases, so you can focus on exactly what you want to
                    practice — no more digging through endless problems.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-between text-sm text-white mb-6">
                    {[
                      {
                        title: "Saved Questions",
                        desc: "Save generated questions and revisit them anytime.",
                      },
                      {
                        title: "Code Submission",
                        desc: "Run your code and check output instantly in any language.",
                      },
                      {
                        title: "Multilingual Support",
                        desc: "Generate and solve questions in the language you prefer.",
                      },
                    ].map(({ title, desc }, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-[#1F222B] rounded-xl px-4 py-5 text-center space-y-2"
                      >
                        <h2 className="font-semibold">{title}</h2>
                        <p className="text-gray-400 text-xs">{desc}</p>
                      </div>
                    ))}
                  </div>
                  <InputBar
                    prompt={prompt}
                    setPrompt={setPrompt}
                    logged={logged}
                    generateQuestion={generateQuestion}
                    handleKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
