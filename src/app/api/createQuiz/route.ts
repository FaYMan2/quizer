import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from '@/utils/prisma';
import quiz from "@/app/quiz/[QuizID]/page";


export async function POST(req:Request){
    const { QuizData } = await req.json()
    const { userId } = getAuth(req as any)

    if(!userId){
        return NextResponse.json({ success: 'false', quizID : 'None'});
    }

    const q = await prisma.quiz.create({
        data : {
            userId : userId,
            QuizData : QuizData
        },
    })
    console.log('quiz' + quiz)
    const quizID = q.QuizID
    console.log(quizID + "hi")
    return NextResponse.json({
        quizId : quizID,
        success : 'true'
    })
}