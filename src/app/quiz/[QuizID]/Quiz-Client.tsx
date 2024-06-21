"use client";

import { JsonValue } from "@prisma/client/runtime/library";
import Question from "@/components/Question";

export default function QuizClient({QuizData} : {QuizData : JsonValue | null}){
    return (
        <Question/>
    )
}