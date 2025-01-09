import { useState, useRef, useCallback, useEffect } from "react";

const isKeyboardCodeAllowed = (code: string) => {
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "BackSpace" ||
    code === "Space"
  );
};

const useTyping = (enable: boolean) => {
  const [cursor, setCursor] = useState(0);
  const [typed, setTyped] = useState<string>("");
  const totalTyped = useRef(0);

  const keydownHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      if (!enable && !isKeyboardCodeAllowed(code)) return;
      switch (key) {
        case "Backspace":
          setTyped((prev) => prev.slice(0, -1));
          break;
        default:
          setTyped((prev) => prev.concat(key));
          setCursor((prev) => prev + 1);
          totalTyped.current += 1;
      }
    },
    [cursor, enable]
  );

  const clearTyped = useCallback(() => {
    setTyped("");
    setCursor(0);
  }, []);

  const resetTotalTyped = useCallback(() => {
    totalTyped.current = 0;
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    return () => window.removeEventListener("keydown", keydownHandler);
  }, [keydownHandler]);

  return {
    resetTotalTyped,
    clearTyped,
    keydownHandler,
    cursor,
    typed,
    totalTyped: totalTyped.current,
  };
};

export default useTyping
