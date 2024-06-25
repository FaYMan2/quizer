"use client";

import Form from "@/components/Form";
import { useState } from "react";
import { useRouter } from "next/navigation";


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
      console.error("na ho paya bauji", error);
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
        console.error("lavde lag gaye");
      }
    } else {
      console.log("do nothing");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-auto gap-28">
      <h1>Quiz on anything</h1>
      <Form
        inputText={inputText}
        handleSubmit={handleSubmit}
        setInputText={setInputText}
        isLoading = {isLoading}
      />
    </main>
  );
}
