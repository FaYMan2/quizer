import { useEffect, useState } from "react";
import { ProgressDemo } from "./ui/ProgressBar"
import Confetti from 'react-dom-confetti';
import { Button } from "./ui/button";

const ConfettiConfig = {
    angle: 120,
    spread: 360,
    startVelocity: 30,
    elementCount: 100,
    dragFriction: 0.12,
    duration: 4000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };
const buttonTailwind = "rounded-xl bg-secondary text-slate-300 hover:bg-primary hover:text-black hover:opacity-80"
export default function Report(
    {
        Score,
        maxScore,
        handleShare,
        handleTryAgain
    } : {   
        Score : number,
        maxScore : number,
        handleShare : (event : any) => void
        handleTryAgain : (event : any) => void
    }){

    const scorePercent = (Score / maxScore) * 100
    const [explode,setExplode] = useState(false)
    useEffect(() => {
        if(scorePercent > 50){
            setExplode(true)
        }
    },[])

    return (<>
        <div className='flex flex-col justify-center w-screen items-center gap-12 mt-24'>   
            <Confetti active={explode} config={ConfettiConfig} />
            {scorePercent > 50 ? <h1 className="text-2xl">Well Done</h1> : <h1 className="text-2xl">Better luck next time</h1> }
            <ProgressDemo Score={scorePercent} />
            <h1 className="text-xl"><pre>
                Score : {Score}
            </pre></h1>
            <h1 className="text-xl"><pre>
                Max Score : {maxScore}
            </pre></h1>
        </div>
        <div className="flex justify-between mx-8">
            <Button className={buttonTailwind}
                onClick={handleTryAgain}>
                Try again
            </Button>
            <Button className={buttonTailwind}
                onClick={handleShare}>
                Share Quiz
           </Button>
        </div>
    </>)
}