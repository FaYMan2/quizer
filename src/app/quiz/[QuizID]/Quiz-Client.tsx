"use client";


import Question from "@/components/Question";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

export interface QuizJSON {
    title: string;
    description: string;
    questions: question[];
  }
  
export  interface question {
    question: string;
    options: Option[];
    answer: string;
  }
  
  interface Option {
    optionNumber: string;
    optionString: string;
  }

export default function QuizClient({QuizData} : {QuizData : QuizJSON}){
    const [idx, setIdx] = useState(0);
    const len = QuizData.questions.length;
    const router = useRouter()
    const [isClicked,setIsClicked] = useState(false)
    const [isCorrect,setIsCorrect] = useState(false)
    const [chosenOption,setChosenOption] = useState('')

    const nextQuestion = () => {
      if (idx < len - 1) {
        setIdx(idx + 1);
        setIsClicked(false)
        setIsCorrect(false)
        setChosenOption('')
      }
    };
  
    const prevQuestion = () => {
      if (idx > 0) {
        setIdx(idx - 1);
      }
    };

    return (

      <>
        <div className="flex flex-col justify-center items-center mt-32"> 
          <Question data={QuizData.questions[idx]} 
          idx={idx}
          isClicked={isClicked}
          isCorrect={isCorrect}
          chosenOption={chosenOption}
          setIsClicked={setIsClicked}
          setIsCorrect={setIsCorrect}
          setChosenOption={setChosenOption}/>
        </div>
        <div className="flex justify-between">
            <Button variant={"secondary"} className='mx-2 rounded-xl mt-2 text-lg font-sans'
            onClick={prevQuestion}
            disabled={idx == 0}>Previous</Button>
            <Button variant={"secondary"} className='mx-2 rounded-xl mt-2 px-6 text-lg font-sans'
            onClick={nextQuestion}
            disabled={idx == len-1}>Next</Button>
        </div>
      </>
    )
  
}