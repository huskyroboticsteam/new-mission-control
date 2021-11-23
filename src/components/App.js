import { useState } from "react";
import Socket from "./network/Socket";
import InputManager from "./input/InputManager";
import Sidebar from "./sidebar/Sidebar";
import PanelContainer from "./panelContainer/PanelContainer";
import "./App.css";

const initialUserInput = {
  driveStraight: 0,
  driveSteer: 0,
  armBase: 0,
  shoulder: 0,
  elbow: 0
};

function App() {
  const [roverConnected, setRoverConnected] = useState(false);
  const [stopEngaged, setStopEngaged] = useState(false);
  const [driveGamepadConnected, setDriveGamepadConnected] = useState(false);
  const [armGamepadConnected, setArmGamepadConnected] = useState(false);
  const [userInput, setUserInput] = useState(initialUserInput);
  const [cameraStreamFrameData, setCameraStreamFrameData] = useState(null);

  const handleRoverConnect = () => {
    setRoverConnected(true);
  }

  const handleRoverDisconnect = () => {
    setRoverConnected(false);
    // The rover will likely be reset when the socket is closed, so disable the
    // emergency stop.
    setStopEngaged(false);
    setCameraStreamFrameData(null);
  };

  const handleRoverMessage = (message) => {
    setCameraStreamFrameData(message.data);
  };

  return (
    <div className="app">
      <Socket
        onConnect={handleRoverConnect}
        onReceiveMessage={handleRoverMessage}
        onDisconnect={handleRoverDisconnect}
        stopEngaged={stopEngaged}
        userInput={userInput}
      />

      <InputManager
        setDriveGamepadConnected={setDriveGamepadConnected}
        setArmGamepadConnected={setArmGamepadConnected}
        userInput={userInput}
        setUserInput={setUserInput}
      />

      <Sidebar
        roverConnected={roverConnected}
        stopEngaged={stopEngaged}
        setStopEngaged={setStopEngaged}
        driveGamepadConnected={driveGamepadConnected}
        armGamepadConnected={armGamepadConnected}
      />

      <PanelContainer
        cameraStreamFrameData={cameraStreamFrameData}
      />
    </div >
  );
}

export default App;
