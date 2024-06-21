import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "./ui/card"
import Option from "@/components/Option";

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

export default function Question(){
    const data = JSON.parse(q)

    return(
        <div className="flex justify-center items-center font-sans rounded-xl">
            <Card className="bg-card">
                <CardHeader className="gap-4">
                    <CardTitle>Q1</CardTitle>
                    <CardDescription className="text-slate-300 text-lg">{data.question}</CardDescription>
                    <CardContent className="grid grid-cols-2 place-items-center">
                        {
                            data.options.map((option : {optionNumber : string , optionString : string}) =>{
                                return(
                                    <Option optionNumber={option.optionNumber} optionString={option.optionString}/>
                                )
                            })
                        }
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    )

    
}