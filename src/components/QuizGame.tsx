import { useState, useEffect } from "react";
import { questions } from "@/data/questions";
import { Timer } from "./Timer";
import { PrizeLadder } from "./PrizeLadder";
import { Button } from "./ui/button";
import { Lightbulb, Users } from "lucide-react";
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
  const [won, setWon] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setTimerActive(true);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setRemovedOptions([]);
  }, [currentQuestionIndex]);

  const handleAnswer = (optionLabel: string) => {
    if (isAnswered) return;

    setSelectedAnswer(optionLabel);
    setIsAnswered(true);
    setTimerActive(false);

    const isCorrect = optionLabel === currentQuestion.correctAnswer;

    setTimeout(() => {
      if (isCorrect) {
        if (currentQuestionIndex === questions.length - 1) {
          setWon(true);
          setGameOver(true);
          toast({
            title: "🎉 Congratulations!",
            description: "You won ₹5 Crore!",
          });
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
        }
      } else {
        setGameOver(true);
        toast({
          title: "Game Over",
          description: `Wrong answer! You won ${
            currentQuestionIndex > 0 ? questions[currentQuestionIndex - 1].prize : "₹0"
          }`,
          variant: "destructive",
        });
      }
    }, 2000);
  };

  const handleTimeUp = () => {
    setGameOver(true);
    toast({
      title: "Time's Up!",
      description: `You won ${
        currentQuestionIndex > 0 ? questions[currentQuestionIndex - 1].prize : "₹0"
      }`,
      variant: "destructive",
    });
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
    setWon(false);
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-kbc-purple-dark via-kbc-purple to-kbc-purple-light flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-kbc-gold">
            {won ? "🎉 WINNER! 🎉" : "Game Over"}
          </h1>
          <p className="text-3xl text-white">
            {won
              ? "You won ₹5 Crore!"
              : `You won ${
                  currentQuestionIndex > 0 ? questions[currentQuestionIndex - 1].prize : "₹0"
                }`}
          </p>
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
                <p className="text-sm text-kbc-gold">KAUN BANEGA</p>
                <p className="text-3xl font-bold text-kbc-gold">CROREPATI</p>
              </div>
            </div>
          </div>

          {/* Timer */}
          <Timer onTimeUp={handleTimeUp} isActive={timerActive} />

          {/* Question */}
          <div className="w-full max-w-4xl">
            <div className="bg-kbc-purple-light/50 border-4 border-kbc-gold rounded-lg p-6 mb-8">
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

            {/* Lifelines */}
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
            </div>
          </div>

          <div className="h-8" />
        </div>

        {/* Prize Ladder */}
        <div className="bg-kbc-purple-dark/80 border-l-4 border-kbc-gold overflow-y-auto">
          <PrizeLadder currentQuestion={currentQuestionIndex + 1} />
        </div>
      </div>
    </div>
  );
};
