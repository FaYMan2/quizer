"use client";


import Form from "@/components/Form"
import { useState } from "react";
import { useRouter } from 'next/navigation';

const dummydata = `{
    
  "questions": [
    {
      "question": "What is the name of the spiky-haired protagonist who dreams of becoming the Hokage (leader) in the anime Naruto?",
      "options": [
        { "optionNumber": "1", "optionString": "Sasuke Uchiha" },
        { "optionNumber": "2", "optionString": "Naruto Uzumaki" },
        { "optionNumber": "3", "optionString": "Sakura Haruno" },
        { "optionNumber": "4", "optionString": "Kakashi Hatake" }
      ],
      "answer": "2"
    },
    {
      "question": "What is the giant ball of electrical energy used by Goku, the main character in Dragon Ball Z, to defeat his enemies?",
      "options": [
        { "optionNumber": "1", "optionString": "Spirit Bomb" },
        { "optionNumber": "2", "optionString": "Kamehameha" },
        { "optionNumber": "3", "optionString": "Destructo Disc" },
        { "optionNumber": "4", "optionString": "Taiyoken" }
      ],
      "answer": "1"
    },
    {
      "question": "What is the name of the high school where students compete in deadly games for survival in the anime Squid Game?",
      "options": [
        { "optionNumber": "1", "optionString": "Hyun Jung High School" },
        { "optionNumber": "2", "optionString": "Suil High School" },
        { "optionNumber": "3", "optionString": "Anyang High School" },
        { "optionNumber": "4", "optionString": "Seonggyu High School" }
      ],
      "answer": "4"
    },
    {
      "question": "What is the profession of the eccentric detective Sherlock Holmes in the anime series Moriarty the Patriot, where the story is told from his rival's perspective?",
      "options": [
        { "optionNumber": "1", "optionString": "Consulting Criminal" },
        { "optionNumber": "2", "optionString": "Consulting Detective" },
        { "optionNumber": "3", "optionString": "Forensic Scientist" },
        { "optionNumber": "4", "optionString": "University Professor" }
      ],
      "answer": "2"
    },
    {
      "question": "What is the name of the powerful titan Eren Yeager transforms into in the anime Attack on Titan?",
      "options": [
        { "optionNumber": "1", "optionString": "Armored Titan" },
        { "optionNumber": "2", "optionString": "Attack Titan" },
        { "optionNumber": "3", "optionString": "Colossal Titan" },
        { "optionNumber": "4", "optionString": "Female Titan" }
      ],
      "answer": "2"
    }
  ]
}`

export default function Home() {
  const router = useRouter()
  const [inputText, setInputText] = useState('')

  const createQuiz = async (QuizData: JSON) => {
    try {
      const res = await fetch('/api/createQuiz', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          QuizData
        })
      })
      const {quizID, success} = await res.json()
      console.log(quizID,success)
      if(success === 'true'){
        return quizID
      }
      else{
        return null
      }
    }
    catch (error) {
      console.error('na ho paya bauji', error)
      return false
    }
  }

  const handleSubmit = async (event: any) => {
    console.log(inputText)
    event.preventDefault()
    if (inputText) {
      const jsonOBJ = JSON.parse(dummydata)
      console.log(jsonOBJ)
      const QuizID = await createQuiz(jsonOBJ)
      if (QuizID) {
        console.log(QuizID)
        router.push(`/quiz/${QuizID}`)
      }
      else {
        console.error('lavde lag gaye')
      }
    }
    else {
      console.log("do nothing")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-auto gap-28" >
      <h1>Quiz on anything</h1>
      <Form inputText={inputText} handleSubmit={handleSubmit} setInputText={setInputText} />
    </main>
  );
}
