import React, { useState } from "react";
import { QuizQuestion } from "@/data/htmlCourseData";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess, showError } from "@/utils/toast";

interface QuizComponentProps {
  questions: QuizQuestion[];
}

const QuizComponent: React.FC<QuizComponentProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
    setShowFeedback(false);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      showSuccess("Correct! 🎉");
    } else {
      showError(`Incorrect. The correct answer was: "${currentQuestion.correctAnswer}"`);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
      showSuccess(`Quiz completed! Your score: ${score}/${questions.length}`);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8 border-2 border-fuchsia-400 dark:border-fuchsia-700 rounded-2xl shadow-lg bg-gradient-to-br from-white via-fuchsia-50 to-indigo-50 dark:from-gray-900 dark:via-fuchsia-950 dark:to-indigo-950">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-fuchsia-700 dark:text-fuchsia-200">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-xl text-indigo-900 dark:text-fuchsia-200 mb-4">
            You scored <span className="font-bold text-fuchsia-700 dark:text-fuchsia-300">{score}</span> out of <span className="font-bold text-fuchsia-700 dark:text-fuchsia-300">{questions.length}</span> questions.
          </p>
          <p className="text-indigo-900 dark:text-fuchsia-200">Great job!</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleResetQuiz} className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-bold">
            Retake Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8 border-2 border-fuchsia-400 dark:border-fuchsia-700 rounded-2xl shadow-lg bg-gradient-to-br from-white via-fuchsia-50 to-indigo-50 dark:from-gray-900 dark:via-fuchsia-950 dark:to-indigo-950">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-fuchsia-700 dark:text-fuchsia-200">
          Question {currentQuestionIndex + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-lg font-medium text-indigo-900 dark:text-fuchsia-200">{currentQuestion.question}</p>
        <RadioGroup onValueChange={handleAnswerSelect} value={selectedAnswer || ""} className="space-y-3">
          {currentQuestion.options.map((option) => (
            <div
              key={option}
              className={`flex items-center space-x-3 p-3 border rounded-md transition-colors duration-200
                ${
                  showFeedback
                    ? option === currentQuestion.correctAnswer
                      ? "bg-green-100 border-green-400 dark:bg-green-900 dark:border-green-600"
                      : selectedAnswer === option
                      ? "bg-red-100 border-red-400 dark:bg-red-900 dark:border-red-600"
                      : "bg-white dark:bg-gray-900"
                    : "hover:bg-fuchsia-100 hover:text-fuchsia-700 dark:hover:bg-fuchsia-800 dark:hover:text-fuchsia-100"
                }
              `}
            >
              <RadioGroupItem value={option} id={option} disabled={showFeedback} />
              <Label htmlFor={option} className="text-base cursor-pointer flex-1 text-indigo-900 dark:text-fuchsia-200">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-end">
        {!showFeedback ? (
          <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer} className="w-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-bold">
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} className="w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-bold">
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizComponent;