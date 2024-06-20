

export default function quiz({ params } : {params : {QuizID : string}}){
    return (
        <h1>Hello mamma {params.QuizID}</h1>
    )
}