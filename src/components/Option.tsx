import { motion } from "framer-motion"

export default function Option( { optionString,optionNumber,handleClick } : {
    optionString : string,
    optionNumber : string,
    handleClick : (event : any) => void
    isClicked : boolean,
    isCorrect : boolean
}){

    return (
        <motion.div className="flex 
        bg-card 
        justify-center 
        m-2 p-2 w-[350px] 
        items-center 
        border-2 border-ring 
        rounded-xl hover:bg-primary
        text-slate-300  hover:text-black  transition duration-200
        hover:opacity-80 hover:cursor-pointer"  id = {optionNumber}
        onClick={handleClick}
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.8 }}  >
            
            <h1>{optionString}</h1>
        </motion.div>
    )
}