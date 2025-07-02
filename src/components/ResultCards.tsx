type TestCase = {
  input: string;
  expected: string;
  stdout: string;
  status: string;
  passed: boolean;
};

type ResultCardsProps = {
  results: TestCase[];
};

function ResultCard({ result }: { result: TestCase }) {
  const borderSideColor = result.passed ? 'border-l-green-500' : 'border-l-red-500';
  const headingColor = result.passed ? 'text-green-400' : 'text-red-400';
  const headingText = result.passed ? 'Passed' : 'Failed';

  return (
    <div className={`rounded-md px-4 py-2 mb-2 border-l-4 ${borderSideColor} bg-[#4a3aff] text-white`}>
      <div className="flex justify-between items-center">
        <p><strong>Input:</strong> <span>{result.input}</span></p>
        <p className={`text-sm font-semibold ${headingColor}`}>{headingText}</p>
      </div>
    </div>
  );
}

export default function ResultCards({ results }: ResultCardsProps) {
  const total = results.length;
  const passed = results.filter(r => r.passed).length;
  const allPassed = passed === total;
  const headingText = allPassed ? '✅ Correct Answer' : '❌ Wrong Answer';
  const headingColor = allPassed ? 'text-green-400' : 'text-red-400';

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className={`text-lg font-semibold ${headingColor}`}>{headingText}</h2>
        <span className="text-white text-sm font-medium">{passed}/{total} Passed</span>
      </div>
      <div className="space-y-2">
        {results.map((res, idx) => (
          <ResultCard key={idx} result={res} />
        ))}
      </div>
    </div>
  );
}
