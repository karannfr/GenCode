import { useEffect,useRef } from "react";

type IOFieldsProps = {
  stdin: string,
  setStdin: React.Dispatch<React.SetStateAction<string>>,
  stdout: string
}

const IOFields = ({stdin,stdout,setStdin}: IOFieldsProps) => {
  const stdoutRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (stdoutRef.current) {
      stdoutRef.current.style.height = "auto";
      stdoutRef.current.style.height = stdoutRef.current.scrollHeight + "px";
    }
  }, [stdout]);
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="stdin" className="block mb-1 font-medium text-gray-700">
          stdin
        </label>
        <textarea
          id="stdin"
          name="stdin"
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
          rows={1}
          placeholder="Enter input here..."
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
          }}
          className="w-full p-3 rounded-lg bg-white/5 backdrop-blur-md text-white border border-[#4a3aff4f] placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#4a3aff] transition-colors duration-300 overflow-hidden resize-none" 
        />
        <div className="text-red-500 mt-4">NOTE: Custom input is mandatory</div>
      </div>

       <div>
        <label htmlFor="stdout" className="block mb-1 font-medium text-gray-700">
          stdout
        </label>
        <textarea
          ref={stdoutRef}
          id="stdout"
          name="stdout"
          value={stdout}
          readOnly
          rows={1}
          placeholder="Output will appear here..."
          className="w-full resize-none overflow-hidden bg-amber-100 p-2 rounded-md border border-amber-300 focus:outline-none text-black font-mono placeholder:text-gray-500"
        />
      </div>
    </div>
  );
};

export default IOFields;
