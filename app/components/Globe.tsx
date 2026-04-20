"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { csvParseRows } from "d3-dsv";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

type GlobeProps = {
  height: number;
  width: number;
};

const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]: string[]) => ({ airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source });
const routeParse = ([airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment]: string[]) => ({ airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment });

const AUCKLAND_IATA = 'AKL';
const MAP_CENTER = { lat: -36.8509, lng: 174.7645, altitude: 1 };
const OPACITY = 0.3;

export default function GlobeViz({ height, width }: GlobeProps) {
  const globeEl = useRef<any>(null);
  const [airports, setAirports] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [hoverArc, setHoverArc] = useState<any>();

  useEffect(() => {
    Promise.all([
      fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat')
        .then(res => res.text())
        .then(d => csvParseRows(d, airportParse)),
      fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat')
        .then(res => res.text())
        .then(d => csvParseRows(d, routeParse))
    ]).then(([airportsData, routesData]) => {

      const byIata: Record<string, any> = airportsData.reduce((acc: any, curr: any) => {
        if (curr.iata) acc[curr.iata] = curr;
        return acc;
      }, {});

      const aucklandRoutes = routesData
        .filter((d: any) => byIata.hasOwnProperty(d.srcIata) && byIata.hasOwnProperty(d.dstIata))
        .filter((d: any) => d.stops === '0')
        .map((d: any) => Object.assign(d, {
          srcAirport: byIata[d.srcIata],
          dstAirport: byIata[d.dstIata]
        }))
        .filter((d: any) => d.srcAirport.iata === AUCKLAND_IATA || d.dstAirport.iata === AUCKLAND_IATA);

      const activeAirportIatas = new Set();
      aucklandRoutes.forEach((r: any) => {
        activeAirportIatas.add(r.srcIata);
        activeAirportIatas.add(r.dstIata);
      });
      const filteredAirports = airportsData.filter((d: any) => activeAirportIatas.has(d.iata));

      setAirports(filteredAirports);
      setRoutes(aucklandRoutes);

      setTimeout(() => {
        if (globeEl.current) {
          globeEl.current.pointOfView(MAP_CENTER, 4000);
        }
      }, 100);
    });
  }, []);

  return (
    <div className="border dark:border-white/10 border-black/20 rounded-lg overflow-hidden max-[1400px]:hidden">
      
      <Globe
        ref={globeEl}
        width={width}
        height={height}
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
        backgroundColor="rgba(0,0,0,0)"
        arcsData={routes}
        arcLabel={(d: any) => `${d.airline}: ${d.srcIata} → ${d.dstIata}`}
        arcStartLat={(d: any) => +d.srcAirport.lat}
        arcStartLng={(d: any) => +d.srcAirport.lng}
        arcEndLat={(d: any) => +d.dstAirport.lat}
        arcEndLng={(d: any) => +d.dstAirport.lng}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={1500}
        arcsTransitionDuration={0}
        arcColor={(d: any) => {
          const op = !hoverArc ? OPACITY : d === hoverArc ? 0.9 : OPACITY / 4;
          return [`rgba(0, 255, 0, ${op})`, `rgba(255, 0, 0, ${op})`];
        }}
        onArcHover={setHoverArc}
        pointsData={airports}
        pointColor={() => 'orange'}
        pointAltitude={0}
        pointRadius={0.04}
        pointsMerge={true}
      />
    </div>
  );
}