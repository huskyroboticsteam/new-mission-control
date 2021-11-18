import { useRef, useEffect } from "react";

function KeyboardControls({ setUserInput }) {
  const pressedKeysRef = useRef([]);
  useEffect(() => addKeyboardListeners(pressedKeysRef, setUserInput), [setUserInput]);
  return (
    <></>
  );
}

function addKeyboardListeners(pressedKeysRef, setUserInput) {
  const handleKeyDown = (ev) => {
    const pressedKey = ev.key;
    if (!pressedKeysRef.current.includes(pressedKey)) {
      pressedKeysRef.current = [...pressedKeysRef.current, pressedKey];
      updateUserInput(pressedKeysRef.current, setUserInput);
    }
  }

  const handleKeyUp = (ev) => {
    const releasedKey = ev.key;
    pressedKeysRef.current = pressedKeysRef.current.filter((key) => key !== releasedKey);
    updateUserInput(pressedKeysRef.current, setUserInput);
  }

  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;
}

function updateUserInput(pressedKeys, setUserInput) {
  const driveX = getAxis(pressedKeys, "ArrowLeft", "ArrowRight");
  const driveY = getAxis(pressedKeys, "ArrowUp", "ArrowDown");
  const userInput = {
    driveX,
    driveY
  }
  setUserInput(userInput);
}

function getAxis(pressedKeys, positiveKey, negativeKey) {
  let axis = 0;
  if (pressedKeys.includes(positiveKey)) {
    axis += 1;
  }
  if (pressedKeys.includes(negativeKey)) {
    axis -= 1;
  }
  return axis;
}

export default KeyboardControls;
