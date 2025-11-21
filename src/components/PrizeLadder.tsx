interface PrizeLadderProps {
  currentQuestion: number;
}

const prizes = [
  { level: 15, amount: "5 Crore" },
  { level: 14, amount: "1 Crore" },
  { level: 13, amount: "50,00,000" },
  { level: 12, amount: "25,00,000" },
  { level: 11, amount: "12,50,000" },
  { level: 10, amount: "6,40,000" },
  { level: 9, amount: "3,20,000" },
  { level: 8, amount: "1,60,000" },
  { level: 7, amount: "80,000" },
  { level: 6, amount: "40,000" },
  { level: 5, amount: "20,000" },
  { level: 4, amount: "10,000" },
  { level: 3, amount: "5,000" },
  { level: 2, amount: "2,000" },
  { level: 1, amount: "1,000" },
];

export const PrizeLadder = ({ currentQuestion }: PrizeLadderProps) => {
  return (
    <div className="flex flex-col gap-1 p-4">
      {prizes.map((prize) => (
        <div
          key={prize.level}
          className={`flex items-center justify-between px-4 py-1.5 rounded-md transition-all ${
            prize.level === currentQuestion
              ? "bg-kbc-gold text-black font-bold scale-105"
              : prize.level < currentQuestion
              ? "bg-kbc-purple-dark/50 text-gray-400"
              : "bg-kbc-purple-light/30 text-kbc-gold-light"
          }`}
        >
          <span className="text-sm">{prize.level}</span>
          <span className="text-sm">◇</span>
          <span className="text-sm font-semibold">{prize.amount}</span>
        </div>
      ))}
    </div>
  );
};
