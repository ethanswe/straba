import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Gpx from "gpx-parser-builder";


export const GoogleAPI = () => {
  const [map, setMap] = useState(null);
  useEffect(() => {
    const getTrackPoints = Morning_Run => {
        const parsedGpx = Gpx.parse(Morning_Run);
        return parsedGpx.trk[0].trkseg[0].trkpt;
      };
      setMap(getTrackPoints)
}, [map]);

  return <div>{map}</div>;
};