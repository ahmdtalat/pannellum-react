import React, { useRef } from "react";
import { Pannellum } from "../../../src";
import myImage from "../images/alma.jpg";

export const ImageDemo = () => {
  const ref = useRef();
  const [state, setState] = React.useState({
    mediaPhoto: myImage,
    yaww: 180,
    test: false,
    updateText: "initial",
  });

  return (
    <div className="image_main">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button onClick={() => setState((prevState) => ({ author: "change" }))}> change author </button>
        <button onClick={() => setState((prevState) => ({ yaww: prevState.yaww + 10 }))}> change yaw </button>
        <button onClick={() => setState({ updateText: "after update" })}> Should not update </button>
        <h3>{state.updateText}</h3>
        <button
          onClick={() => {
            setState({ test: true, yaww: 100, mediaPhoto: myImage });
          }}
        >
          {" "}
          enable{" "}
        </button>
        <div>{state.test && <button onClick={handleClick}> disable </button>}</div>
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
          author={state.author}
          title=""
        >
          <Pannellum.Hotspot
            type="info"
            pitch={11}
            yaw={-167}
            text="Info Hotspot Text 3"
            URL="https://github.com/farminf"
          />

          <Pannellum.Hotspot
            yaw={120}
            pitch={212}
            type="custom"
            handleDrag={(evt, args) => {
              const draggable = document.querySelector("#textInfo");
              const container = document.querySelector(".pnlm-dragfix");

              function handleDragStart(event) {
                function handleDrag(event) {
                  const rect = container.getBoundingClientRect();

                  draggable.style.transform = `translate(${event.clientX - rect.left}px, ${
                    event.clientY - rect.top
                  }px)`;
                }

                function handleDragEnd() {
                  console.log({ rrrr: ref?.current?.getViewer()?.getConfig() });
                  // Remove the event listeners when the drag ends
                  document.removeEventListener("mousemove", handleDrag);
                  document.removeEventListener("mouseup", handleDragEnd);
                }

                // Attach the event listeners for mousemove and mouseup to the document
                document.addEventListener("mousemove", handleDrag);
                document.addEventListener("mouseup", handleDragEnd);
              }

              handleDragStart(evt);
            }}
            handleDragArg={{ name: "position-marker" }}
          />
        </Pannellum>

        <div className="codebox">
          <pre>
            <code data-language="xml">
              {`
              <Pannellum
                  width="800px"
                  height="400px"
                  image={this.state.mediaPhoto}
                  pitch={10}
                  yaw={180}
                  hfov={500}
                  autoLoad
                  author=""
                  title=""
                  orientationOnByDefault={false}
                  draggable
                  keyboardZoom
                  mouseZoom
                  preview=""
                  previewAuthor=""
                  previewTitle=""
                  showControls
                  showFullscreenCtrl
                  showZoomCtrl
                  onLoad={()=>{console.log("panorama loaded");}}
                  onScenechange={(id)=>{console.log("Scene has change on " + id);}}
                  onScenechangefadedone={()=>{console.log("panorama loaded");}}
                  onError={(err)=>{console.log("Error" , err);}}
                  onErrorcleared={()=>{console.log("Error Cleared");}}
                  onMousedown={(evt)=>{console.log("Mouse Down" , evt);}}
                  onMouseup={(evt)=>{console.log("Mouse Up", evt);}}
                  onTouchstart={(evt)=>{console.log("Touch Start", evt);}}
                  onTouchend={(evt)=>{console.log("Touch End", evt);}}
                  hotspotDebug={false}
              >
                  <Pannellum.Hotspot
                    type="info"
                    pitch={11}
                    yaw={-167}
                    text="Info Hotspot Text 3"
                    URL="https://github.com/farminf"
                  />

                  <Pannellum.Hotspot
                    type="custom"
                    pitch={31}
                    yaw={150}
                    handleClick={(evt , args) => this.hanldeClickImage(evt , args)}
                    handleClickArg={{ "name":"test" }}
                  />

              </Pannellum>
            `}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

// export default class ImageDemo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       mediaPhoto: myImage,
//       yaww: 180,
//       test: false,
//       updateText: "initial",
//       author: "author",
//     };
//     this.ref = React.createRef();
//   }

//   hanldeClickImage = (evt, args) => {
//     console.log(args.name);
//     this.setState({
//       mediaPhoto: myImage2,
//     });
//   };

//   handleClick = () => {
//     this.setState({
//       mediaPhoto: myImage2,
//       test: false,
//     });
//   };

//   render() {
//     return (
//       <div className="image_main">
//         <div style={{ display: "flex", flexDirection: "row" }}>
//           <button onClick={() => this.setState((prevState) => ({ author: "change" }))}> change author </button>
//           <button onClick={() => this.setState((prevState) => ({ yaww: prevState.yaww + 10 }))}> change yaw </button>
//           <button onClick={() => this.setState({ updateText: "after update" })}> Should not update </button>
//           <h3>{this.state.updateText}</h3>
//           <button
//             onClick={() => {
//               this.setState({ test: true, yaww: 100, mediaPhoto: myImage });
//             }}
//           >
//             {" "}
//             enable{" "}
//           </button>
//           <div>{this.state.test && <button onClick={this.handleClick}> disable </button>}</div>
//         </div>
//         <h2 className="section_title">Image Component</h2>
//         <div className="pannellum_div">
//           <Pannellum
//             ref={this.ref}
//             width="800px"
//             height="400px"
//             image={this.state.mediaPhoto}
//             pitch={10}
//             yaw={this.state.yaww}
//             hfov={120}
//             autoLoad
//             author={this.state.author}
//             title=""
//           >
//             <Pannellum.Hotspot
//               type="info"
//               pitch={11}
//               yaw={-167}
//               text="Info Hotspot Text 3"
//               URL="https://github.com/farminf"
//             />

//             <Pannellum.Hotspot
//               yaw={120}
//               pitch={212}
//               type="custom"
//               handleDrag={(evt, args) => {
//                 const draggable = document.querySelector(".hotspot");

//                 function handleDragStart(event) {
//                   // Calculate the offset within the element where the click occurred
//                   const offsetX = event.clientX - draggable.offsetLeft;
//                   const offsetY = event.clientY - draggable.offsetTop;

//                   function handleDrag(event) {
//                     // Update the element's position based on the mouse movement
//                     draggable.style.position = "absolute";
//                     draggable.style.left = `${event.clientX - offsetX}px`;
//                     draggable.style.top = `${event.clientY - offsetY}px`;
//                   }

//                   function handleDragEnd() {
//                     console.log({ rrrr: this.ref });
//                     // Remove the event listeners when the drag ends
//                     document.removeEventListener("mousemove", handleDrag);
//                     document.removeEventListener("mouseup", handleDragEnd);
//                   }

//                   // Attach the event listeners for mousemove and mouseup to the document
//                   document.addEventListener("mousemove", handleDrag);
//                   document.addEventListener("mouseup", handleDragEnd);
//                 }

//                 handleDragStart(evt);
//               }}
//               handleDragArg={{ name: "position-marker" }}
//             />
//           </Pannellum>

//           <div className="codebox">
//             <pre>
//               <code data-language="xml">
//                 {`
//                   <Pannellum
//                       width="800px"
//                       height="400px"
//                       image={this.state.mediaPhoto}
//                       pitch={10}
//                       yaw={180}
//                       hfov={500}
//                       autoLoad
//                       author=""
//                       title=""
//                       orientationOnByDefault={false}
//                       draggable
//                       keyboardZoom
//                       mouseZoom
//                       preview=""
//                       previewAuthor=""
//                       previewTitle=""
//                       showControls
//                       showFullscreenCtrl
//                       showZoomCtrl
//                       onLoad={()=>{console.log("panorama loaded");}}
//                       onScenechange={(id)=>{console.log("Scene has change on " + id);}}
//                       onScenechangefadedone={()=>{console.log("panorama loaded");}}
//                       onError={(err)=>{console.log("Error" , err);}}
//                       onErrorcleared={()=>{console.log("Error Cleared");}}
//                       onMousedown={(evt)=>{console.log("Mouse Down" , evt);}}
//                       onMouseup={(evt)=>{console.log("Mouse Up", evt);}}
//                       onTouchstart={(evt)=>{console.log("Touch Start", evt);}}
//                       onTouchend={(evt)=>{console.log("Touch End", evt);}}
//                       hotspotDebug={false}
//                   >
//                       <Pannellum.Hotspot
//                         type="info"
//                         pitch={11}
//                         yaw={-167}
//                         text="Info Hotspot Text 3"
//                         URL="https://github.com/farminf"
//                       />

//                       <Pannellum.Hotspot
//                         type="custom"
//                         pitch={31}
//                         yaw={150}
//                         handleClick={(evt , args) => this.hanldeClickImage(evt , args)}
//                         handleClickArg={{ "name":"test" }}
//                       />

//                   </Pannellum>
//                 `}
//               </code>
//             </pre>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
