"use client";

import Question from "@/components/Question";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface QuizJSON {
  title: string;
  description: string;
  questions: question[];
}

export interface question {
  question: string;
  options: Option[];
  answer: string;
}

interface Option {
  optionNumber: string;
  optionString: string;
}

export default function QuizClient({
  QuizData,
  QuizId,
}: {
  QuizData: QuizJSON;
  QuizId: string;
}) {
  const [idx, setIdx] = useState(0);
  const len = QuizData.questions.length;

  const [isClicked, setIsClicked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [chosenOption, setChosenOption] = useState("");
  const [Score, setScore] = useState(0);
  const [isFinished, setFinish] = useState(false);
  const router = useRouter();

  const nextQuestion = () => {
    if (idx < len - 1) {
      setIdx(idx + 1);
      setIsClicked(false);
      setIsCorrect(false);
      setChosenOption("");
    }
    if (idx == len - 1) {
      setFinish(true);
    }
  };

  return !isFinished ? (
    <>
      <div className="flex flex-col justify-center items-center mt-32">
        <div className="text-xl ">Score : {Score}</div>
        <Question
          data={QuizData.questions[idx]}
          idx={idx}
          isClicked={isClicked}
          isCorrect={isCorrect}
          chosenOption={chosenOption}
          Score={Score}
          setIsClicked={setIsClicked}
          setIsCorrect={setIsCorrect}
          setChosenOption={setChosenOption}
          setScore={setScore}
        />
      </div>
      <div className="flex justify-end">
        <Button
          variant={"secondary"}
          className="mx-2 rounded-xl mt-2 px-6 text-lg font-sans"
          onClick={nextQuestion}
        >
          {idx !== len - 1 ? "Next" : "Submit"}
        </Button>
      </div>
    </>
  ) : (
    <div>Score : {Score}</div>
  );
}
