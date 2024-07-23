import React, { useRef } from "react";
import { Pannellum } from "../../../src";
import myImage from "../images/alma.jpg";
import myImage2 from "../images/milan.jpg";

export default () => {
  const ref = useRef();
  const [state, setState] = React.useState({
    yaww: 0,
    mediaPhoto: myImage,
    test: false,
    updateText: "initial",
  });

  return (
    <div className="image_main">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button onClick={() => setState((prevState) => ({ ...state, yaww: prevState.yaww + 10 }))}> change yaw </button>
        <h3>{state.updateText}</h3>
        <button
          onClick={() => {
            setState({ ...state, yaww: 100, mediaPhoto: myImage2 });
          }}
        >
          enable
        </button>
      </div>
      <h2 className="section_title">Image Component</h2>

      <div className="pannellum_div">
        <Pannellum
          ref={ref}
          width="800px"
          height="400px"
          image={state.mediaPhoto}
          pitch={10}
          yaw={state.yaww}
          hfov={120}
          autoLoad
        >
          <Pannellum.Hotspot
            type="custom"
            pitch={11}
            yaw={-167}
            handleClick={(evt, args) => console.log(evt, args)}
            handleClickArg={{ name: "test" }}
          />
          <Pannellum.Hotspot
            draggable
            type="custom"
            pitch={31}
            yaw={150}
            cssClass="custom-hotspot"
            handleDrag={(newCoords) => {
              console.log({ newCoords });
            }}
            renderHS={() => {
              return (
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                />
              );
            }}
          />
        </Pannellum>
      </div>
    </div>
  );
};
