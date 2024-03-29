const detectKeyCombination = (keysPressed) => {
  // Detect the key press combination
  if ((keysPressed["Shift"] && keysPressed["ArrowUp"]) || (keysPressed["Shift"] && keysPressed["W"])) {
    return "Shift + Up";
  }

  if ((keysPressed["Shift"] && keysPressed["ArrowDown"]) || (keysPressed["Shift"] && keysPressed["S"])) {
    return "Shift + Down";
  }

  if ((keysPressed["ArrowUp"] && keysPressed["ArrowRight"]) || keysPressed["w"] && keysPressed["d"]) {
    return "Up + Right";
  }
  if ((keysPressed["ArrowUp"] && keysPressed["ArrowLeft"]) || keysPressed["w"] && keysPressed["a"]) {
    return "Up + Left";
  }
  if ((keysPressed["ArrowDown"] && keysPressed["ArrowRight"]) || keysPressed["s"] && keysPressed["d"]) {
    return "Down + Right";
  }
  if ((keysPressed["ArrowDown"] && keysPressed["ArrowLeft"]) || keysPressed["s"] && keysPressed["a"]) {
    return "Down + Left";
  }

  // Detect the arrow keys
  if (keysPressed["ArrowUp"] || keysPressed["w"]) {
    return "Up";
  }
  if (keysPressed["ArrowDown"] || keysPressed["s"]) {
    return "Down";
  }
  if (keysPressed["ArrowLeft"] || keysPressed["a"]) {
    return "Left";
  }
  if (keysPressed["ArrowRight"] || keysPressed["d"]) {
    return "Right";
  }
};

const clickDirection = (selector) => {
  document.querySelector(`[href*="${selector}"`).click();
};

export default () => {
  // Only activate on the space page
  if (location.pathname.includes("space")) {
    console.log(
      "Space page detected, activating keyboard controlled ships feature"
    );

    let keysPressed = {};
    let hasDetected = false;

    // detect arrow keys pressed and detect diagonal presses
    document.addEventListener("keydown", (e) => {
      keysPressed[e.key] = true;
      hasDetected = false;
    });

    document.addEventListener("keyup", (e) => {
      const detectedCombination = detectKeyCombination(keysPressed);

      // Clear the keys pressed
      keysPressed[e.key] = false;

      if (hasDetected) return;
      hasDetected = true;

      switch (detectedCombination) {
        case "Up":
          console.log("↑");
          clickDirection("/0/1/0/");
          break;
        case "Down":
          console.log("↓");
          clickDirection("/0/-1/0/");
          break;
        case "Left":
          console.log("←");
          clickDirection("/-1/0/0/");
          break;
        case "Right":
          console.log("→");
          clickDirection("/1/0/0/");
          break;
        case "Up + Right":
          console.log("↗");
          clickDirection("/1/1/0/");
          break;
        case "Up + Left":
          console.log("↖");
          clickDirection("/-1/1/0/");
          break;
        case "Down + Right":
          console.log("↘");
          clickDirection("/1/-1/0/");
          break;
        case "Down + Left":
          console.log("↙");
          clickDirection("/-1/-1/0/");
          break;
        case "Shift + Up":
          console.log("⇧↑");
          clickDirection("/0/0/1/");
          break;
        case "Shift + Down":
          console.log("⇧↓");
          clickDirection("/0/0/-1/");
          break;
      }
    });
  }
};
