import { motion } from "framer-motion"

const Cursor=()=>{
    return(
        <motion.div
        aria-hidden={true}
        initial={{opacity:1}}
        animate={{opacity:0}}
        exit={{opacity:1}}
        transition={{repeat:Infinity, duration:0.8, ease:'easeInOut'}}
        className="inline-block bg-white h-6 w-[2px]"/>
    )
}

export default Cursor