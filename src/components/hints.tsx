import { useState, useRef, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

type HintsProps = {
  i: number;
  hint: string;
};

const Hints = ({ i, hint }: HintsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="mb-2 border-b border-purple-200/10 pb-2">
      <div
        className="flex flex-row items-center gap-2 cursor-pointer select-none text-white font-medium text-md"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Hint {i + 1}
        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </div>

      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-max-height duration-300 ease-in-out"
      >
        <div className="mt-1 p-2 text-sm text-white/40">
          {hint}
        </div>
      </div>
    </div>
  );
};

export default Hints;
