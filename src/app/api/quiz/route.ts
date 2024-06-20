import { NextResponse } from "next/server";


export  async function POST(req : Request) {
    const body = await req.json()
    const quizType = body.type
    
    return NextResponse.json({
        "hello" : "world from quiz route"
    })
}