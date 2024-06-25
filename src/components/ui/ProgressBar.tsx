
"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function ProgressDemo({Score} : {Score : number}) {
  const [progress, setProgress] = React.useState(10)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(Score), 750)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-[60%]"/>
}
