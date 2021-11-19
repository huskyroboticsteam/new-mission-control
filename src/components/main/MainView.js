import { Switch, Route, Redirect } from "react-router-dom";
import HomeView from "../home/HomeView";
import ArmView from "../arm/ArmView";
import CameraView from "../camera/CameraView";
import MapView from "../map/MapView";
import ScienceView from "../science/ScienceView";
import HelpView from "../help/HelpView";
import "./MainView.css";

function MainView({ webcamFrameBytes }) {
  return (
    <main className="mainView">
      <Switch>
        <Route path="/home">
          <HomeView />
        </Route>

        <Route path="/arm">
          <ArmView />
        </Route>

        <Route path="/camera">
          <CameraView webcamFrameBytes={webcamFrameBytes} />
        </Route>

        <Route path="/map">
          <MapView />
        </Route>

        <Route path="/science">
          <ScienceView />
        </Route>

        <Route path="/help">
          <HelpView />
        </Route>

        <Redirect to="/home" />
      </Switch>
    </main>
  );
}

export default MainView;
