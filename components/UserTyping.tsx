import Cursor from "./cursor";

type UserTypingProps = {
  input: string;
  classes: string;
};

const UserTyping = ({ input, classes }: UserTypingProps) => {
  const characters = input.split("");

  return (
    <div className={classes}>
      {characters?.map((char, index) => (
        <span key={index} className="text-white">
          {char}
        </span>
      ))}
      <Cursor />
    </div>
  );
};

export default UserTyping;


