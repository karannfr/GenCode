import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axiosInstance";

const StatusBar = () => {
  const [stats, setStats] = useState<null | {
    totalQuestions: number;
    solvedQuestions: number;
    languagesUsed: {
      Java: number;
      Python: number;
      C: number;
      Cpp: number;
    };
  }>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosPrivate.get("/stats");
        setStats(response.data.stats);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="w-full bg-[#0F0F1C] text-white px-4 py-2 text-center rounded-lg shadow-md border border-white/10">
        Loading stats...
      </div>
    );
  }

  const { totalQuestions, solvedQuestions, languagesUsed } = stats;

  return (
    <div className="w-full bg-[#0F0F1C] text-white px-4 py-2 flex flex-col gap-2 sm:flex-row justify-between items-center rounded-lg shadow-md border border-white/10">
      <div className="flex flex-col sm:flex-row sm:gap-6 gap-2">
        <div className="flex items-center gap-1">
          <span className="text-lmd font-medium text-white/80">Total Questions Generated:</span>
          <span className="text-md font-semibold text-[#A78BFA]">{totalQuestions}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-md font-medium text-white/80">Total Questions Solved:</span>
          <span className="text-md font-semibold text-[#34D399]">{solvedQuestions}</span>
        </div>
        {Object.entries(languagesUsed).map(([lang, count]) => (
          <div key={lang} className="flex items-center gap-1">
            <span className="text-sm text-white/70">{lang}:</span>
            <span className="text-sm font-semibold text-white">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusBar;
