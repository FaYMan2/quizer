import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/utils/prisma";
import quiz from "@/app/quiz/[QuizID]/page";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";


export const maxDuration = 45;
export const dynamic = 'force-dynamic';
const example = `{{
  "questions": [
    {{
      "question": "What is the name of the spiky-haired protagonist who dreams of becoming the Hokage (leader) in the anime Naruto?",
      "options": [
        {{ "optionNumber": "1", "optionString": "Sasuke Uchiha" }},
        {{ "optionNumber": "2", "optionString": "Naruto Uzumaki" }},
        {{ "optionNumber": "3", "optionString": "Sakura Haruno" }},
        {{ "optionNumber": "4", "optionString": "Kakashi Hatake" }}
      ],
      "answer": "2"
    }},
    {{
      "question": "What is the giant ball of electrical energy used by Goku, the main character in Dragon Ball Z, to defeat his enemies?",
      "options": [
        {{ "optionNumber": "1", "optionString": "Spirit Bomb" }},
        {{ "optionNumber": "2", "optionString": "Kamehameha" }},
        {{ "optionNumber": "3", "optionString": "Destructo Disc" }},
        {{ "optionNumber": "4", "optionString": "Taiyoken" }}
      ],
      "answer": "1"
    }},
    {{
      "question": "What is the name of the high school where students compete in deadly games for survival in the anime Squid Game?",
      "options": [
        {{ "optionNumber": "1", "optionString": "Hyun Jung High School" }},
        {{ "optionNumber": "2", "optionString": "Suil High School" }},
        {{ "optionNumber": "3", "optionString": "Anyang High School" }},
        {{ "optionNumber": "4", "optionString": "Seonggyu High School" }}
      ],
      "answer": "4"
    }},
    {{
      "question": "What is the profession of the eccentric detective Sherlock Holmes in the anime series Moriarty the Patriot, where the story is told from his rival's perspective?",
      "options": [
        {{ "optionNumber": "1", "optionString": "Consulting Criminal" }},
        {{ "optionNumber": "2", "optionString": "Consulting Detective" }},
        {{ "optionNumber": "3", "optionString": "Forensic Scientist" }},
        {{ "optionNumber": "4", "optionString": "University Professor" }}
      ],
      "answer": "2"
    }},
    {{
      "question": "What is the name of the powerful titan Eren Yeager transforms into in the anime Attack on Titan?",
      "options": [
        {{ "optionNumber": "1", "optionString": "Armored Titan" }},
        {{ "optionNumber": "2", "optionString": "Attack Titan" }},
        {{ "optionNumber": "3", "optionString": "Colossal Titan" }},
        {{ "optionNumber": "4", "optionString": "Female Titan" }}
      ],
      "answer": "2"
    }}
  ]
}}`

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
      give a 5 mcq question quiz on topic {input} strictly follow below rules
      1. Give only the JSON
      2. Follow the given JSON fromat strictly 
      3. Write correct JSON and validate it internally
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

      example : ${example}
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
