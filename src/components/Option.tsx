

export default function Option( { optionString,optionNumber } : {
    optionString : string,
    optionNumber : string,
}){

    return (
        <div className="flex 
        bg-card justify-center m-2 p-2 w-[350px] 
        items-center border-2 border-ring 
        rounded-xl hover:bg-primary
        text-slate-300  hover:text-black  transition duration-300
        hover:opacity-80" id = {optionNumber}>
            <h1>{optionString}</h1>
        </div>
    )
}