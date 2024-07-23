import React, { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";
import "../pannellum/css/pannellum.css";
import "../pannellum/css/style-textInfo.css";
import "../pannellum/js/libpannellum.js";
import "../pannellum/js/pannellum.js";
import "../pannellum/js/RequestAnimationFrame";

const Pannellum = (props) => {
  const { children } = props;
  const panoramaRef = useRef(null);
  const [id] = useState(Math.random().toString(36).substr(2, 9));

  const handleClickHotspot = (e, args) => {
    console.log("hotspot clicked", args.name);
  };

  const handleDragHotspot = (newCoords) => {
    console.log(" DRAGGED", newCoords);
  };

  const hotspotTooltip = (hotSpotDiv, args) => {
    hotSpotDiv.setAttribute("id", "textInfo");
    const hDiv = document.createElement("div");
    hDiv.classList.add("hotspot");
    const outDiv = document.createElement("div");
    outDiv.classList.add("out");
    const inDiv = document.createElement("div");
    inDiv.classList.add("in");
    hotSpotDiv.appendChild(hDiv);
    hDiv.appendChild(inDiv);
    hDiv.appendChild(outDiv);
  };

  const renderCustomHS = (rHS) => {
    if (rHS) {
      const htmlString = ReactDOMServer.renderToString(rHS());
      return htmlString;
    }
    return null;
  };

  const renderImage = (state) => {
    const hotspots = React.Children.toArray(children);
    const hotspotArray = hotspots
      .map((hotspot) => {
        switch (hotspot.props.type) {
          case "info":
            return {
              id: Math.random().toString(36).substr(2, 9),
              type: hotspot.props.type,
              pitch: hotspot.props.pitch || 10,
              yaw: hotspot.props.yaw || 10,
              text: hotspot.props.text || "",
              URL: hotspot.props.URL || "",
            };
          case "custom":
            return {
              draggable: hotspot.props.draggable,
              id: Math.random().toString(36).substr(2, 9),
              pitch: hotspot.props.pitch || 10,
              yaw: hotspot.props.yaw || 10,
              cssClass: hotspot.props.cssClass || "tooltipcss",
              createTooltipFunc: hotspot.props.tooltip || hotspotTooltip,
              createTooltipArgs: hotspot.props.tooltipArg || {},
              clickHandlerFunc: hotspot.props.handleClick || handleClickHotspot,
              clickHandlerArgs: hotspot.props.handleClickArg || { name: "test" },
              dragHandlerFunc: hotspot.props.handleDrag || handleDragHotspot,
              dragHandlerArgs: hotspot.props.handleDragArg || { name: "test" },
              renderHS: renderCustomHS(hotspot.props.renderHS),
            };
          default:
            return null;
        }
      })
      .filter((hotspot) => hotspot !== null);

    const jsonConfig = {
      type: "equirectangular",
      panorama: props.image,
      haov: props.haov,
      vaov: props.vaov,
      vOffset: props.vOffset,
      yaw: props.yaw,
      pitch: props.pitch,
      hfov: props.hfov,
      minHfov: props.minHfov,
      maxHfov: props.maxHfov,
      minPitch: props.minPitch,
      maxPitch: props.maxPitch,
      minYaw: props.minYaw,
      maxYaw: props.maxYaw,
      autoRotate: props.autoRotate,
      compass: props.compass,
      preview: props.preview,
      previewTitle: props.previewTitle,
      previewAuthor: props.previewAuthor,
      author: props.author,
      title: props.title,
      autoLoad: props.autoLoad,
      orientationOnByDefault: props.orientationOnByDefault,
      showZoomCtrl: props.showZoomCtrl,
      doubleClickZoom: props.doubleClickZoom,
      keyboardZoom: props.keyboardZoom,
      mouseZoom: props.mouseZoom,
      draggable: props.draggable,
      disableKeyboardCtrl: props.disableKeyboardCtrl,
      showFullscreenCtrl: props.showFullscreenCtrl,
      showControls: props.showControls,
      hotSpotDebug: props.hotspotDebug,
      hotSpots: hotspotArray,
      onRender: props.onRender,
    };

    if (state === "update" && panoramaRef.current?.destroy) {
      panoramaRef.current.destroy();
    }

    panoramaRef.current = window.pannellum.viewer(props.id || id, jsonConfig);

    panoramaRef.current.on("load", props.onLoad);
    panoramaRef.current.on("error", props.onError);
    panoramaRef.current.on("mouseup", props.onMouseup);
    panoramaRef.current.on("touchend", props.onTouchend);
    panoramaRef.current.on("mousedown", props.onMousedown);
    panoramaRef.current.on("touchstart", props.onTouchstart);
    panoramaRef.current.on("scenechange", props.onScenechange);
    panoramaRef.current.on("errorcleared", props.onErrorcleared);
    panoramaRef.current.on("scenechangefadedone", props.onScenechangefadedone);
  };

  useEffect(() => {
    renderImage("update");
  }, [
    props.image,
    props.width,
    props.height,
    props.compass,
    props.title,
    props.author,
    props.preview,
    props.previewTitle,
    props.previewAuthor,
    props.showZoomCtrl,
    props.showFullscreenCtrl,
    props.showControls,
    props.children.length,
  ]);

  useEffect(() => {
    if (panoramaRef.current) {
      panoramaRef.current.setYaw(props.yaw);
      panoramaRef.current.setHfov(props.hfov);
      panoramaRef.current.setPitch(props.pitch);
      panoramaRef.current.setYawBounds([props.minYaw, props.maxYaw]);
      panoramaRef.current.setHfovBounds([props.minHfov, props.maxHfov]);
      panoramaRef.current.setPitchBounds([props.minPitch, props.maxPitch]);
    }
  }, [
    props.yaw,
    props.hfov,
    props.pitch,
    props.minYaw,
    props.maxYaw,
    props.minHfov,
    props.maxHfov,
    props.minPitch,
    props.maxPitch,
  ]);

  useEffect(() => {
    renderImage("mount");

    return () => {
      if (panoramaRef.current) {
        panoramaRef.current.destroy();
      }
    };
  }, []);

  const { width, height } = props;
  const divStyle = {
    width: width,
    height: height,
  };

  return <div id={props.id || id} style={divStyle} ref={panoramaRef} />;
};

Pannellum.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  id: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  image: PropTypes.string,
  haov: PropTypes.number,
  vaov: PropTypes.number,
  vOffset: PropTypes.number,
  yaw: PropTypes.number,
  pitch: PropTypes.number,
  hfov: PropTypes.number,
  minHfov: PropTypes.number,
  maxHfov: PropTypes.number,
  minPitch: PropTypes.number,
  maxPitch: PropTypes.number,
  minYaw: PropTypes.number,
  maxYaw: PropTypes.number,
  autoRotate: PropTypes.number,
  compass: PropTypes.bool,
  preview: PropTypes.string,
  previewTitle: PropTypes.string,
  previewAuthor: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  autoLoad: PropTypes.bool,
  orientationOnByDefault: PropTypes.bool,
  showZoomCtrl: PropTypes.bool,
  doubleClickZoom: PropTypes.bool,
  keyboardZoom: PropTypes.bool,
  mouseZoom: PropTypes.bool,
  draggable: PropTypes.bool,
  disableKeyboardCtrl: PropTypes.bool,
  showFullscreenCtrl: PropTypes.bool,
  showControls: PropTypes.bool,
  onLoad: PropTypes.func,
  onScenechange: PropTypes.func,
  onScenechangefadedone: PropTypes.func,
  onError: PropTypes.func,
  onErrorcleared: PropTypes.func,
  onMousedown: PropTypes.func,
  onMouseup: PropTypes.func,
  onTouchstart: PropTypes.func,
  onTouchend: PropTypes.func,
  hotspotDebug: PropTypes.bool,
  tooltip: PropTypes.func,
  tooltipArg: PropTypes.object,
  handleClick: PropTypes.func,
  handleClickArg: PropTypes.object,
  cssClass: PropTypes.string,
  onRender: PropTypes.func,
};

Pannellum.defaultProps = {
  children: [],
  width: "100%",
  height: "400px",
  image: "",
  haov: 360,
  vaov: 180,
  vOffset: 0,
  yaw: 0,
  pitch: 0,
  hfov: 100,
  minHfov: 50,
  maxHfov: 150,
  minPitch: -90,
  maxPitch: 90,
  minYaw: -180,
  maxYaw: 180,
  autoRotate: 0,
  compass: false,
  preview: "",
  previewTitle: "",
  previewAuthor: "",
  title: "",
  author: "",
  autoLoad: false,
  orientationOnByDefault: false,
  showZoomCtrl: true,
  doubleClickZoom: true,
  keyboardZoom: true,
  mouseZoom: true,
  draggable: true,
  disableKeyboardCtrl: false,
  showFullscreenCtrl: true,
  showControls: true,
  onLoad: () => {},
  onScenechange: () => {},
  onScenechangefadedone: () => {},
  onError: () => {},
  onErrorcleared: () => {},
  onMousedown: () => {},
  onMouseup: () => {},
  onTouchstart: () => {},
  onTouchend: () => {},
  hotspotDebug: false,
  onRender: null,
};

Pannellum.Hotspot = () => {};

export default Pannellum;
