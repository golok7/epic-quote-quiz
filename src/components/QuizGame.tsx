import { useState, useEffect } from "react";
import { questions } from "@/data/questions";
import { Timer } from "./Timer";
import { TeamScoreboard } from "./TeamScoreboard";
import { Button } from "./ui/button";
import { Lightbulb, Users, Trophy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const QuizGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timerActive, setTimerActive] = useState(true);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const [askExpertUsed, setAskExpertUsed] = useState(false);
  const [removedOptions, setRemovedOptions] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [currentTimeLeft, setCurrentTimeLeft] = useState(30);

  const currentQuestion = questions[currentQuestionIndex];
  const currentTeam = currentQuestionIndex % 2 === 0 ? "A" : "B";

  useEffect(() => {
    setTimerActive(true);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setRemovedOptions([]);
    setCurrentTimeLeft(30);
  }, [currentQuestionIndex]);

  const handleTimerTick = (seconds: number) => {
    setCurrentTimeLeft(seconds);
  };

  const handleAnswer = (optionLabel: string) => {
    if (isAnswered) return;

    setSelectedAnswer(optionLabel);
    setIsAnswered(true);
    setTimerActive(false);

    const isCorrect = optionLabel === currentQuestion.correctAnswer;
    // Points calculation: timeLeft * 100
    const points = currentTimeLeft * 100;

    setTimeout(() => {
      if (isCorrect) {
        // Award points to the current team
        if (currentTeam === "A") {
          setTeamAScore((prev) => {
            const newScore = prev + points;
            console.log(`Team A Score Update: ${prev} + ${points} = ${newScore}`);
            return newScore;
          });
          toast({
            title: "✓ Correct!",
            description: `Team A earned ${points} points! (${currentTimeLeft}s left)`,
          });
        } else {
          setTeamBScore((prev) => {
            const newScore = prev + points;
            console.log(`Team B Score Update: ${prev} + ${points} = ${newScore}`);
            return newScore;
          });
          toast({
            title: "✓ Correct!",
            description: `Team B earned ${points} points! (${currentTimeLeft}s left)`,
          });
        }
      } else {
        toast({
          title: "✗ Wrong Answer",
          description: `Team ${currentTeam} didn't score this round.`,
          variant: "destructive",
        });
      }

      // Move to next question or end game
      if (currentQuestionIndex === questions.length - 1) {
        setTimeout(() => {
          endQuiz();
        }, 1000);
      } else {
        setTimeout(() => {
          setCurrentQuestionIndex((prev) => prev + 1);
        }, 1000);
      }
    }, 2000);
  };

  const handleTimeUp = () => {
    toast({
      title: "⏰ Time's Up!",
      description: `Team ${currentTeam} didn't answer in time.`,
      variant: "destructive",
    });
    
    setIsAnswered(true);
    setTimerActive(false);
    
    setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        endQuiz();
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }, 2000);
  };

  const endQuiz = () => {
    setGameOver(true);
    const winner = teamAScore > teamBScore ? "A" : teamBScore > teamAScore ? "B" : "TIE";
    
    if (winner === "TIE") {
      toast({
        title: "🤝 It's a Tie!",
        description: `Both teams scored ${teamAScore} points!`,
      });
    } else {
      toast({
        title: `🎉 Team ${winner} Wins!`,
        description: `Team A: ${teamAScore} pts | Team B: ${teamBScore} pts`,
      });
    }
  };

  const handleFiftyFifty = () => {
    if (fiftyFiftyUsed || isAnswered) return;

    const correctAnswer = currentQuestion.correctAnswer;
    const wrongOptions = currentQuestion.options
      .filter((opt) => opt.label !== correctAnswer)
      .map((opt) => opt.label);

    const toRemove = wrongOptions.slice(0, 2);
    setRemovedOptions(toRemove);
    setFiftyFiftyUsed(true);

    toast({
      title: "50:50 Lifeline Used",
      description: "Two wrong options have been removed!",
    });
  };

  const handleAskExpert = () => {
    if (askExpertUsed || isAnswered) return;

    setAskExpertUsed(true);
    const expertOpinion = currentQuestion.options.find(
      (opt) => opt.label === currentQuestion.correctAnswer
    )?.text;

    toast({
      title: "Expert Says:",
      description: `I think the answer is: ${expertOpinion}`,
    });
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimerActive(true);
    setFiftyFiftyUsed(false);
    setAskExpertUsed(false);
    setRemovedOptions([]);
    setGameOver(false);
    setTeamAScore(0);
    setTeamBScore(0);
  };

  if (gameOver) {
    const winner = teamAScore > teamBScore ? "A" : teamBScore > teamAScore ? "B" : "TIE";
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-kbc-purple-dark via-kbc-purple to-kbc-purple-light flex items-center justify-center">
        <div className="text-center space-y-8">
          <Trophy className="w-32 h-32 mx-auto text-kbc-gold" />
          <h1 className="text-6xl font-bold text-kbc-gold">
            {winner === "TIE" ? "🤝 It's a Tie!" : `🎉 Team ${winner} Wins! 🎉`}
          </h1>
          
          <div className="flex justify-center gap-8">
            <div className="bg-kbc-purple-dark/80 border-4 border-kbc-gold rounded-lg p-8">
              <h3 className="text-2xl font-bold text-kbc-gold mb-2">Team A</h3>
              <p className="text-5xl font-bold text-white">{teamAScore}</p>
              <p className="text-lg text-kbc-gold-light mt-2">points</p>
            </div>
            
            <div className="bg-kbc-purple-dark/80 border-4 border-kbc-gold rounded-lg p-8">
              <h3 className="text-2xl font-bold text-kbc-gold mb-2">Team B</h3>
              <p className="text-5xl font-bold text-white">{teamBScore}</p>
              <p className="text-lg text-kbc-gold-light mt-2">points</p>
            </div>
          </div>
          
          <Button
            onClick={resetGame}
            className="bg-kbc-gold hover:bg-kbc-gold-light text-black font-bold text-xl px-8 py-6"
          >
            Play Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-kbc-purple-dark via-kbc-purple to-kbc-purple-light text-white">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] h-screen">
        {/* Main Game Area */}
        <div className="flex flex-col items-center justify-between p-8">
          {/* Logo Area */}
          <div className="text-center mb-8">
            <div className="w-48 h-48 mx-auto mb-4 rounded-full border-8 border-kbc-gold bg-kbc-purple-dark flex items-center justify-center">
              <div className="text-center">
                <p className="text-4xl font-bold text-kbc-gold">The Epic</p>
                <p className="text-3xl font-bold text-kbc-gold">Challenge</p>
              </div>
            </div>
            <div className="mt-4 text-2xl font-bold text-kbc-gold">
              Team {currentTeam}'s Turn
            </div>
          </div>

          {/* Timer */}
          <Timer onTimeUp={handleTimeUp} isActive={timerActive} onTick={handleTimerTick} />

          {/* Question */}
          <div className="w-full max-w-4xl">
            <div className="bg-kbc-purple-light/50 border-4 border-kbc-gold rounded-lg p-6 mb-4">
              <p className="text-2xl text-center text-kbc-gold font-semibold">
                {currentQuestion.question}
              </p>
            </div>
            
            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentQuestion.options.map((option) => {
                const isRemoved = removedOptions.includes(option.label);
                const isSelected = selectedAnswer === option.label;
                const isCorrect = option.label === currentQuestion.correctAnswer;
                const shouldShowColor = isAnswered && isSelected;

                return (
                  <button
                    key={option.label}
                    onClick={() => handleAnswer(option.label)}
                    disabled={isAnswered || isRemoved}
                    className={`
                      relative px-6 py-4 border-4 rounded-lg text-left transition-all duration-300
                      ${
                        isRemoved
                          ? "opacity-30 cursor-not-allowed"
                          : shouldShowColor
                          ? isCorrect
                            ? "bg-green-500 border-green-600"
                            : "bg-yellow-400 border-yellow-500"
                          : "bg-kbc-purple-light/50 border-kbc-gold hover:bg-kbc-purple-light hover:scale-105"
                      }
                    `}
                  >
                    <span className="text-kbc-gold font-bold mr-3">{option.label}:</span>
                    <span className={shouldShowColor ? "text-black font-bold" : "text-white"}>
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Lifelines and Controls */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleFiftyFifty}
                disabled={fiftyFiftyUsed || isAnswered}
                className="bg-kbc-gold hover:bg-kbc-gold-light text-black font-bold disabled:opacity-50"
              >
                <Lightbulb className="mr-2" />
                50:50
              </Button>
              <Button
                onClick={handleAskExpert}
                disabled={askExpertUsed || isAnswered}
                className="bg-kbc-gold hover:bg-kbc-gold-light text-black font-bold disabled:opacity-50"
              >
                <Users className="mr-2" />
                Ask Expert
              </Button>
              <Button
                onClick={endQuiz}
                variant="destructive"
                className="font-bold"
              >
                <Trophy className="mr-2" />
                End Quiz
              </Button>
            </div>
          </div>

          <div className="h-8" />
        </div>

        {/* Team Scoreboard */}
        <div className="bg-kbc-purple-dark/80 border-l-4 border-kbc-gold overflow-y-auto">
          <TeamScoreboard 
            teamAScore={teamAScore} 
            teamBScore={teamBScore} 
            currentTeam={currentTeam}
          />
        </div>
      </div>
    </div>
  );
};
