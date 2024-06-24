"use client"    

import { useParams } from "next/navigation"

export default async function Report({p} : {p : {QuizId : string}}){
    const params = useParams<{id : string}>()
    console.log('params' + params.id)

    return (
        <h1>Hello mamma {params.id}</h1>
    )
}   