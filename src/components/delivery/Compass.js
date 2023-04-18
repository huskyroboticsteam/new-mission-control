import React from "react";
import { useSelector } from "react-redux";
import { selectRoverPosition } from "../../store/telemetrySlice";
import "./Compass.css";

const Compass = () => {
  const { orientW, orientX, orientY, orientZ, posX, posY, posZ } = useSelector(
    selectRoverPosition
  );

  // Calculate the direction based on the quaternion values
  const direction = Math.round(
    (Math.atan2(
      2 * (orientW * orientZ + orientX * orientY),
      1 - 2 * (orientY * orientY + orientZ * orientZ)
    ) * 180) / Math.PI
  );

  let roll = Math.round(
    (Math.atan2(
      2 * (orientW * orientX + orientY * orientZ),
      1 - 2 * (orientX * orientX + orientY * orientY)
    ))
  );


  const pitch = Math.round(
    2 * Math.atan2(
      2 * (orientY * orientW - orientX * orientZ),
      1 - 2 * (orientY * orientY + orientZ * orientZ)
    )
  );

  const latitude = posX;
  const longitude = posY;
  const altitude = posZ;
  

  // angle = 2 * acos(c1c2c3 + s1s2s3)
  // c1 = 1 in all cases, since yaw = 0
  // s1s2s3 = 0 in all cases, since yaw = 0
  // math comes from here: https://www.euclideanspace.com/maths/geometry/rotations/conversions/eulerToAngle/index.htm

  const c2 = Math.cos(pitch / 2);
  const c3 = Math.cos(roll / 2);

  const angle = (2 * Math.acos(c2 * c3) * 180)/Math.PI;

  roll = Math.round(roll*180/Math.PI);

  let needleColor;
  if (Math.abs(angle) < 20) {
    needleColor = "green";
  } else if (Math.abs(angle) < 45) {
    needleColor = "yellow";
  } else {
    needleColor = "red";
  }

  return (
    <div className="compass-container">
      <div className="compass">
        <div
          className={`compass__needle compass__needle--${needleColor}`}
          style={{ transform: `rotate(${direction}deg)` }}
        ></div>
        <div className={`compass__outer-ring ${needleColor}`}></div>
        <div className="compass__label compass__label--north">N</div>
        <div className="compass__label compass__label--south">S</div>
        <div className="compass__label compass__label--west">W</div>
        <div className="compass__label compass__label--east">E</div>
      </div>
      <div className="info"> 
        <div>roll: {roll}</div>
        <div>pitch: {pitch}</div>
        <div>latitude: {latitude}</div>
        <div>longitude: {longitude}</div>   
        <div>altitude: {altitude ? altitude : "N/A"}</div>

      </div>
    </div>
  );
  
};

export default Compass;
