import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/utils/prisma";
import quiz from "@/app/quiz/[QuizID]/page";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";


export const maxDuration = 45;
export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
  const { inputText } = await req.json();
  console.log('CREATE API QUIZ CALLED')
  const model = new ChatGoogleGenerativeAI({
    model : "gemini-pro",
    maxOutputTokens : 2048,
    apiKey : process.env.GOOGLE_API_KEY
  })
  console.log('model init')
  const parser = new StringOutputParser()
  const JsonPrompt = new PromptTemplate({
    inputVariables : ['input'],
    template : `
      give a 5 mcq question quiz on topic {input} in json format and send only the JSON with no extra characters
      dont use quoutes ("",'')
      {{
        questions : [
          question : string,
          options : [{{
              optionNumber : string,
              optionString : string,
          }}]
          answer : optionNumber
        ]
      }}
          Strictly follow the JSON format and write only the JSON
    `
  })

  const chain = JsonPrompt.pipe(model).pipe(parser)
  console.log('gemini called')
  const data = await chain.invoke({input : inputText})
  console.log('got prompt')
  console.log(data)
  const QuizData = JSON.parse(data)
  console.log('GOT JSON')
  const { userId } = getAuth(req as any);

  if (!userId) {
    return NextResponse.json({ success: "false", quizID: "None" });
  }

  const q = await prisma.quiz.create({
    data: {
      userId: userId,
      QuizData: QuizData,
    },
  });
  console.log('created data in prisma')
  console.log("quiz" + quiz);
  const quizID = q.QuizID;
  console.log(quizID + "hi");
  return NextResponse.json({
    quizId: quizID,
    success: "true",
  });
}
