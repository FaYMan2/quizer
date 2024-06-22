import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { question as question } from "@/app/quiz/[QuizID]/Quiz-Client";
import { Dispatch, SetStateAction } from 'react';

const q = `{
    "answer" : "2",
    "options": [
      {
        "optionNumber": "1",
        "optionString": "Sasuke Uchiha"
      },
      {
        "optionNumber": "2",
        "optionString": "Naruto Uzumaki"
      },
      {
        "optionNumber": "3",
        "optionString": "Sakura Haruno"
      },
      {
        "optionNumber": "4",
        "optionString": "Kakashi Hatake"
      }
    ],
    "question": "What is the name of the spiky-haired protagonist who dreams of becoming the Hokage (leader) in the anime Naruto?"
}`;
const data = JSON.parse(q);

export default function Question({data,
  idx,
  isCorrect,
  isClicked,
  chosenOption,
  setIsClicked,
  setIsCorrect,
  setChosenOption
} : {data : question,
   idx : number,
   isCorrect : boolean,
   isClicked : boolean,
   chosenOption : string,
   setIsClicked : Dispatch<SetStateAction<boolean>>
   setIsCorrect : Dispatch<SetStateAction<boolean>>
   setChosenOption : Dispatch<SetStateAction<string>>
  }) {



    const handleClick = (optionNumber : string) => {
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
        }
    }, [isClicked,isCorrect,chosenOption]);


    return (
        <div className="flex justify-center items-center font-sans rounded-xl">
            <Card className="bg-card">
                <CardHeader className="gap-4">
                    <CardTitle>{idx + 1}</CardTitle>
                    <CardDescription className="text-slate-300 text-lg">{data.question}</CardDescription>
                    <CardContent className="grid grid-cols-2 place-items-center">
                        {
                            data.options.map((option : {optionNumber : string , optionString : string}) => (
                                <motion.div
                                  key={option.optionNumber}
                                  className={`flex bg-card justify-center m-2 p-2 w-[350px] items-center border-2 border-ring rounded-xl transition duration-200 
                                    ${chosenOption === option.optionNumber && isClicked ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'hover:bg-primary text-slate-300 hover:text-black hover:opacity-80 cursor-pointer'}`}
                                  onClick={() => handleClick(option.optionNumber)}
                                  whileHover={{ scale: 1.025 }}
                                  whileTap={{ scale: 0.8 }}
                                >
                                    <h1>{option.optionString}</h1>
                                </motion.div>
                            ))
                        }
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    );
}