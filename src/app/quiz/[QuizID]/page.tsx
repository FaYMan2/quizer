import prisma from "@/utils/prisma"
import { currentUser } from "@clerk/nextjs/server"
import QuizClient from "./Quiz-Client";
export default async function quiz({ params } : {params : {QuizID : string}}){
    const user : any | null  = await currentUser();
    const q = await prisma.quiz.findFirst({
        where : {
            QuizID : params.QuizID,
            userId : user?.id,
        }
    })

    if(!q){
        return <div> quiz data not found </div>
    }

    return (
        <QuizClient QuizData = {q.QuizData}/>
    )
}