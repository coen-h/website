"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

type GlobeProps = {
  height: number;
  width: number;
};

type CableProperties = {
  color: string;
  name: string;
};

type CablePath = {
  coords: [number, number][];
  properties: CableProperties;
};

type GeoJSONFeature = {
  type: "Feature";
  geometry: {
    type: string;
    coordinates: [number, number][] | [number, number][][];
  };
  properties: CableProperties;
};

type GeoJSON = {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
};

export default function GlobeViz({ height, width }: GlobeProps) {
  const [cablePaths, setCablePaths] = useState<CablePath[]>([]);

  useEffect(() => {
    fetch("/cable-geo.json")
      .then((r) => r.json())
      .then((cablesGeo: GeoJSON) => {
        const paths: CablePath[] = [];
        cablesGeo.features.forEach(({ geometry, properties }) => {
          if (geometry.type === "MultiLineString") {
            (geometry.coordinates as [number, number][][]).forEach((coords) =>
              paths.push({ coords, properties })
            );
          } else if (geometry.type === "LineString") {
            paths.push({ coords: geometry.coordinates as [number, number][], properties });
          }
        });
        setCablePaths(paths);
      });
  }, []);

  return (
    <div className="border-x border-y-2 dark:border-white/10 border-black/20 rounded-lg max-[1400px]:hidden">
      <div className={`flex flex-col fixed z-50 w-[550px] backdrop-blur-md px-2 py-0.5`}>
        <div className='flex justify-between'>
          <p>WORLD VIEW</p>
          <p className="text-black/50 dark:text-white/50">GLOBAL NETWORK MAP</p>
        </div>
        <div className="flex justify-between">
          <p className="text-black/50 dark:text-white/50">ENDPOINT LAT/LON</p>
          <p className="text-black/25 dark:text-white/25">36.8509, 174.7645</p>
        </div>
      </div>
      <Globe
        width={width}
        height={height}
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        pathsData={cablePaths}
        pathPoints="coords"
        pathPointLat={(p) => p[1]}
        pathPointLng={(p) => p[0]}
        pathColor={(path: object) => (path as CablePath).properties.color}
        pathLabel={(path: object) => (path as CablePath).properties.name}
        pathDashLength={0.1}
        pathDashGap={0.008}
        pathDashAnimateTime={12000}
      />
    </div>
  );
}
