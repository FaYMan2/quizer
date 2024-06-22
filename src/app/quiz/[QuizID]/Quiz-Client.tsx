"use client";

import { JsonValue } from "@prisma/client/runtime/library";
import Question from "@/components/Question";

export default function QuizClient({QuizData} : {QuizData : JsonValue | null}){
    return (
        <div className="flex flex-col justify-center items-center h-dvh"> 
            <Question/>
        </div>
    )
}