"use client";

import React, { useEffect, useState, useRef } from "react";
import Globe from "react-globe.gl";

type GlobeProps = {
  height: number;
  width: number;
};

type CablePath = {
  coords: [number, number][];
  properties: {
    color: string;
    name: string;
  };
};

export default function GlobeViz({ height, width }: GlobeProps) {
  const globeEl = useRef();
  const [cablePaths, setCablePaths] = useState<CablePath[]>([]);

  useEffect(() => {
    fetch("/cable-geo.json")
      .then((r) => r.json())
      .then((cablesGeo) => {
        const paths: CablePath[] = [];
        cablesGeo.features.forEach(({ geometry, properties }: any) => {
          geometry.coordinates.forEach((coords: [number, number][]) =>
            paths.push({ coords, properties })
          );
        });
        setCablePaths(paths);
      });
  }, []);

  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 1;

    globeEl.current.pointOfView({ altitude: 2 }, 3000);
  }, []);

  return (
    <div className="border-x border-y-2 border-white/10 rounded-lg">
      <div className={`flex flex-col fixed z-50 w-[550px] backdrop-blur-md px-2 py-0.5`}>
        <div className='flex justify-between'>
          <p>WORLD VIEW</p>
          <p className="text-white/50">GLOBAL NETWORK MAP</p>
        </div>
        <div className="flex justify-between">
          <p className="text-white/50">ENDPOINT LAT/LON</p>
          <p className="text-white/25">-42.8927, -71.2808</p>
        </div>
      </div>
      <Globe
        ref={globeEl}
        width={width}
        height={height}
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        pathsData={cablePaths}
        pathPoints="coords"
        pathPointLat={(p) => p[1]}
        pathPointLng={(p) => p[0]}
        pathColor={(path) => path.properties.color}
        pathLabel={(path) => path.properties.name}
        pathDashLength={0.1}
        pathDashGap={0.008}
        pathDashAnimateTime={12000}
      />
    </div>
  );
}
