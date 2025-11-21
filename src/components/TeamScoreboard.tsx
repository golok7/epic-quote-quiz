interface TeamScoreboardProps {
  teamAScore: number;
  teamBScore: number;
  currentTeam: "A" | "B";
}

export const TeamScoreboard = ({ teamAScore, teamBScore, currentTeam }: TeamScoreboardProps) => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div
        className={`p-6 rounded-lg border-4 transition-all ${
          currentTeam === "A"
            ? "border-kbc-gold bg-kbc-gold/20 scale-105"
            : "border-kbc-gold/30 bg-kbc-purple-dark/50"
        }`}
      >
        <h3 className="text-2xl font-bold text-kbc-gold mb-2">Team A</h3>
        <p className="text-4xl font-bold text-white">{teamAScore} pts</p>
        {currentTeam === "A" && (
          <p className="text-sm text-kbc-gold-light mt-2">Current Turn</p>
        )}
      </div>

      <div
        className={`p-6 rounded-lg border-4 transition-all ${
          currentTeam === "B"
            ? "border-kbc-gold bg-kbc-gold/20 scale-105"
            : "border-kbc-gold/30 bg-kbc-purple-dark/50"
        }`}
      >
        <h3 className="text-2xl font-bold text-kbc-gold mb-2">Team B</h3>
        <p className="text-4xl font-bold text-white">{teamBScore} pts</p>
        {currentTeam === "B" && (
          <p className="text-sm text-kbc-gold-light mt-2">Current Turn</p>
        )}
      </div>
    </div>
  );
};
