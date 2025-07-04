type StatusBarProps = {
  totalGenerated: number;
  totalSolved: number;
};

const StatusBar = ({ totalGenerated, totalSolved }: StatusBarProps) => {
  return (
    <div className="w-full bg-[#0F0F1C] text-white px-4 py-2 flex flex-col gap-2 sm:flex-row justify-between items-center rounded-lg shadow-md border border-white/10">
      <div className="flex items-center gap-1">
        <span className="text-lmd font-medium text-white/80">Total Questions Generated: </span>
        <span className="text-md font-semibold text-[#A78BFA]">{totalGenerated}</span>
      </div>
      <div className="flex items-center gap-1 mt-2 sm:mt-0">
        <span className="text-md font-medium text-white/80">Total Questions Solved: </span>
        <span className="text-md font-semibold text-[#34D399]">{totalSolved}</span>
      </div>
    </div>
  );
};

export default StatusBar;