"use client";

import Form from "@/components/Form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast,{Toaster} from 'react-hot-toast'
import { TypeAnimation } from 'react-type-animation';


export default function Home() {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [isLoading,setLoading] = useState(false)
  const createQuiz = async (inputText: string) => {
    setLoading(true)
    try {
      const res = await fetch("/api/createQuiz", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          inputText,
        }),
      });
      const { quizId, success } = await res.json();
      console.log(quizId, success);
      if (success === "true") {
        return quizId;
      } else {
        return null;
      }
    } catch (error) {
      toast.error('Something went wrong please try again')
      setLoading(false)
      return false;
    }
  };

  const handleSubmit = async (event: any) => {
    console.log(inputText);
    event.preventDefault();
    if (inputText) {
      const QuizID = await createQuiz(inputText);
      if (QuizID) {
        console.log(QuizID);
        router.push(`/quiz/${QuizID}`);
      } else {
        toast.error('Something went wrong please try again')
      }
    } else {
      toast.error('Empty Input')
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-auto gap-28 m-8 ">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <TypeAnimation className="text-4xl text-slate-200"
        sequence={[
          'Test yourself',
          750,
          'Quiz Yourself',
          500,
          'Quiz Yourself on anything',
          750
      ]}
        repeat={0}
        cursor = {true}
        wrapper={'b'}
     />

      <Form
        inputText={inputText}
        handleSubmit={handleSubmit}
        setInputText={setInputText}
        isLoading = {isLoading}
      />
    </main>
  );
}
