import { span } from "framer-motion/client";
import Cursor from "./cursor";
import { cn } from "@/lib/utils";

type UserTypingProps = {
  input: string;
  classes: string;
  word:string;
};

type charactersProps ={
  actual:string;
  expected:string;
}

const UserTyping = ({ input, classes, word }: UserTypingProps) => {
  const characters = input.split("");

  return (
    <div className={classes}>
      {characters?.map((char, index) => (
        // <span key={index}  className="text-white">
        //   {char}
        // </span>
        <Character key={index} actual={char} expected={word[index]} />
      ))}
      <Cursor />
    </div>
  );
};



const Character=({actual,expected}:charactersProps)=>{
  const isCorrect=actual===expected;
  const isWhiteSpace=expected==" "
  return(
    <span className={cn({
      "text-red-600": !isCorrect && !isWhiteSpace,
      "text-white": isCorrect && !isWhiteSpace,
      "bg-red-600/50": !isCorrect && isWhiteSpace
    })}>{expected}</span>
  )
}

export default UserTyping;


