import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "./ui/card"
import Option from "@/components/Option";
import { useState } from "react";


const  q =  `{
        
    "answer" : "2",
    "options": [
      {
        "optionNumber": "1",
        "optionString": "Sasuke Uchiha"
      },
      {
        "optionNumber": "2",
        "optionString": "Naruto Uzumaki"
      },
      {
        "optionNumber": "3",
        "optionString": "Sakura Haruno"
      },
      {
        "optionNumber": "4",
        "optionString": "Kakashi Hatake"
      }
    ],
    "question": "What is the name of the spiky-haired protagonist who dreams of becoming the Hokage (leader) in the anime Naruto?"
}`
const data = JSON.parse(q)

export default function Question(){
    const [isCorrect,setIsCorrect] = useState(false)
    const [isClicked,setIsClicked] = useState(false)

    const handleClick = (event : any) =>{
      const chosenOption = event.target.id
      console.log(`chosen option : ${chosenOption} correct option : ${data.answer}`)
    
      if (chosenOption === data.answer){
        setIsCorrect(true)
        console.log('is correct called : correct option')
      }
      else if (chosenOption !== data.answer){
        setIsCorrect(false)
        console.log('is correct called : incorrect answer')
      }
      setIsClicked(true)

      console.log(`isCorrect : ${isCorrect}, isClicked : ${isClicked}`)
    }

    return(
        <div className="flex justify-center items-center font-sans rounded-xl">
            <Card className="bg-card">
                <CardHeader className="gap-4">
                    <CardTitle>Q1</CardTitle>
                    <CardDescription className="text-slate-300 text-lg">{data.question}</CardDescription>
                    <CardContent className="grid grid-cols-2 place-items-center">
                        {
                            data.options.map((option : {optionNumber : string , optionString : string}) => {
                                return(                        
                                      <Option optionNumber={option.optionNumber} optionString={option.optionString}
                                        handleClick={handleClick} isClicked={isClicked} isCorrect={isCorrect}/>
                                )
                            })
                        }
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    )

    
}