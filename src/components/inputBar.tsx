import React from 'react'
type InputBarProps = {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  generateQuestion: () => void;
  logged: boolean;
};

  const InputBar = ({prompt,setPrompt,handleKeyDown,generateQuestion,logged}:InputBarProps) => (
    <div className="w-full relative">
      <input
        type="text"
        value={prompt}
        placeholder="Enter your question here ..."
        className={`w-full px-6 py-4 pr-14 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 
          focus:outline-none focus:ring-2 focus:ring-[#7480FF] 
          transition-all duration-300 text-sm shadow-inner ${
            !logged ? "rounded-lg" : "rounded-lg"
          }`}
        onChange={(e) => {
          if(logged){
            setPrompt(e.target.value)
        }else{
          generateQuestion();
        }
      }}
        onKeyDown={handleKeyDown}
      />
        <button
        onClick={generateQuestion}
        className={`cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-[#7480FF] hover:bg-[#5f6aff] 
          text-white transition duration-200 ${
            !logged ? "rounded-lg" : "rounded-lg"
          }`}
      >
        ➜
      </button> 
    </div>
  );


export default InputBar;