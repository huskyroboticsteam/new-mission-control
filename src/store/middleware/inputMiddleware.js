import { messageRover } from "../roverSlice";

/**
 * Middleware that messages the rover in response to user input.
 */
const inputMiddleware = store => next => action => {
  const prevComputedInput = store.getState().input.computed;
  next(action);
  const computedInput = store.getState().input.computed;

  const { straight: prevStraight, steer: prevSteer } = prevComputedInput.drive;
  const { straight, steer } = computedInput.drive;
  if (straight !== prevStraight || steer !== prevSteer) {
    store.dispatch(messageRover({
      message: {
        type: "driveRequest",
        straight,
        steer
      }
    }));
  }

  Object.keys(computedInput.motorPower).forEach(motorName => {
    if (computedInput[motorName] !== prevComputedInput[motorName])
      store.dispatch(messageRover({
        message: {
          type: "motorPowerRequest",
          motor: motorName,
          power: computedInput.motorPower[motorName]
        }
      }));
  });
}

export default inputMiddleware;
