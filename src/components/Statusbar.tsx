type StatusBarProps = {
  totalGenerated: number;
  totalSolved: number;
};

const StatusBar = ({ totalGenerated, totalSolved }: StatusBarProps) => {
  return (
    <div className="w-full bg-[#0F0F1C] text-white px-4 py-2 flex flex-col sm:flex-row justify-between items-center rounded-lg shadow-md border border-white/10">
      <div className="flex items-center gap-2">
        <span className="text-lg font-medium text-white/80">Total Questions Generated:</span>
        <span className="text-lg font-semibold text-[#A78BFA]">{totalGenerated}</span>
      </div>
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <span className="text-lg font-medium text-white/80">Total Questions Solved:</span>
        <span className="text-lg font-semibold text-[#34D399]">{totalSolved}</span>
      </div>
    </div>
  );
};

export default StatusBar;