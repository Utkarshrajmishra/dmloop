import { useCallback, useState } from "react";

const useAccuracy = (word: string) => {
  const [errors, setError] = useState<number>(0);

  const getError = useCallback((cursor: number, userInput: string) => {
    const words = word.substring(0, cursor).split("");
    setError((prev) =>
      words.reduce((error, expectedChar, index) => {
        if (expectedChar != userInput[index]) {
          error++;
        }
        return error;
      }, 0)
    );
  }, [word]);

  return {errors, getError}
};

export default useAccuracy
