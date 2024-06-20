"use client";

import Form from "@/components/Form"
import { use, useState } from "react";
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter()
  const [inputText,setInputText] =  useState('')

  const handleSubmit = (event : any) => {
    console.log(inputText)
    event.preventDefault()
    if (inputText){
      /* whole logic */
      router.push('/quiz')
    }
    else{
      console.log("do nothing")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-auto">
      <h1>Quiz on anything</h1>
      <Form inputText={inputText} handleSubmit={handleSubmit} setInputText={setInputText}/>
    </main>
  );
}
