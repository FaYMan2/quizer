import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { question as question } from "@/app/quiz/[QuizID]/Quiz-Client";
import { Dispatch, SetStateAction } from "react";

export default function Question({
  data,
  idx,
  isCorrect,
  isClicked,
  chosenOption,
  Score,
  setIsClicked,
  setIsCorrect,
  setChosenOption,
  setScore,
}: {
  data: question;
  idx: number;
  isCorrect: boolean;
  isClicked: boolean;
  chosenOption: string;
  Score: number;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
  setIsCorrect: Dispatch<SetStateAction<boolean>>;
  setChosenOption: Dispatch<SetStateAction<string>>;
  setScore: Dispatch<SetStateAction<number>>;
}) {
  const handleClick = (optionNumber: string) => {
    setChosenOption(optionNumber);
    if (optionNumber === data.answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setIsClicked(true);
  };

  useEffect(() => {
    if (isClicked) {
      console.log(`isCorrect: ${isCorrect}, chosenOption: ${chosenOption}`);
      if (isCorrect) {
        setScore(Score + 1);
      }
    }
  }, [isClicked, isCorrect, chosenOption]);

  return (
    <div className="flex justify-center items-center font-sans rounded-xl">
      <Card className="bg-card">
        <CardHeader className="gap-4">
          <CardTitle>{`Q ${idx + 1}`}</CardTitle>
          <CardDescription className="text-slate-300 text-lg">
            {data.question}
          </CardDescription>
          <CardContent className="grid grid-cols-2 place-items-center">
            {data.options.map(
              (option: { optionNumber: string; optionString: string }) => (
                <motion.div
                  key={option.optionNumber}
                  className={`flex bg-card justify-center m-2 p-2 w-[350px] items-center border-2 border-ring rounded-xl transition duration-200 
                                    ${isClicked ? (isCorrect ? (chosenOption === option.optionNumber ? "bg-green-500 text-white" : "hover:bg-primary text-slate-300 hover:text-black hover:opacity-80 cursor-pointer") : chosenOption === option.optionNumber || data.answer === option.optionNumber ? (data.answer === option.optionNumber ? "bg-green-500 text-white" : "bg-red-500 text-white") : "hover:bg-primary text-slate-300 hover:text-black hover:opacity-80 cursor-pointer") : "hover:bg-primary text-slate-300 hover:text-black hover:opacity-80 cursor-pointer"}`}
                  onClick={
                    !isClicked
                      ? () => handleClick(option.optionNumber)
                      : () => console.log("already answered")
                  }
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <h1>{option.optionString}</h1>
                </motion.div>
              ),
            )}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
