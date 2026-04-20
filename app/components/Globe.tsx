"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { csvParseRows } from "d3-dsv";
import type { GlobeMethods, GlobeProps as ReactGlobeProps } from "react-globe.gl";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false }) as React.ComponentType<
  ReactGlobeProps & { ref?: React.MutableRefObject<GlobeMethods | undefined> }
>;

type GlobeProps = {
  height: number;
};

type Airport = {
  airportId: string;
  name: string;
  city: string;
  country: string;
  iata: string;
  icao: string;
  lat: string;
  lng: string;
  alt: string;
  timezone: string;
  dst: string;
  tz: string;
  type: string;
  source: string;
};

type Route = {
  airline: string;
  airlineId: string;
  srcIata: string;
  srcAirportId: string;
  dstIata: string;
  dstAirportId: string;
  codeshare: string;
  stops: string;
  equipment: string;
};

type RouteWithAirports = Route & {
  srcAirport: Airport;
  dstAirport: Airport;
};

const airportParse = ([airportId, name, city, country, iata, icao, lat, lng, alt, timezone, dst, tz, type, source]: string[]): Airport => ({
  airportId,
  name,
  city,
  country,
  iata,
  icao,
  lat,
  lng,
  alt,
  timezone,
  dst,
  tz,
  type,
  source,
});

const routeParse = ([airline, airlineId, srcIata, srcAirportId, dstIata, dstAirportId, codeshare, stops, equipment]: string[]): Route => ({
  airline,
  airlineId,
  srcIata,
  srcAirportId,
  dstIata,
  dstAirportId,
  codeshare,
  stops,
  equipment,
});

const AUCKLAND_IATA = "AKL";
const MAP_CENTER = { lat: -36.8509, lng: 174.7645, altitude: 2 };
const OPACITY = 0.3;

export default function GlobeViz({ height }: GlobeProps) {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [routes, setRoutes] = useState<RouteWithAirports[]>([]);
  const [hoverArc, setHoverArc] = useState<RouteWithAirports | null>(null);
  const [globeWidth, setGlobeWidth] = useState(0);

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const element = wrapperRef.current;
    const observer = new ResizeObserver(([entry]) => {
      setGlobeWidth(Math.floor(entry.contentRect.width));
    });

    observer.observe(element);
    setGlobeWidth(Math.floor(element.getBoundingClientRect().width));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    Promise.all([
      fetch("https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat")
        .then((res) => res.text())
        .then((data) => csvParseRows(data, airportParse)),
      fetch("https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat")
        .then((res) => res.text())
        .then((data) => csvParseRows(data, routeParse)),
    ]).then(([airportsData, routesData]) => {
      const byIata = airportsData.reduce<Record<string, Airport>>((acc, curr) => {
        if (curr.iata) {
          acc[curr.iata] = curr;
        }
        return acc;
      }, {});

      const aucklandRoutes = routesData
        .filter((route) => Object.prototype.hasOwnProperty.call(byIata, route.srcIata) && Object.prototype.hasOwnProperty.call(byIata, route.dstIata))
        .filter((route) => route.stops === "0")
        .map(
          (route): RouteWithAirports => ({
            ...route,
            srcAirport: byIata[route.srcIata],
            dstAirport: byIata[route.dstIata],
          }),
        )
        .filter((route) => route.srcAirport.iata === AUCKLAND_IATA || route.dstAirport.iata === AUCKLAND_IATA);

      const activeAirportIatas = new Set<string>();
      aucklandRoutes.forEach((route) => {
        activeAirportIatas.add(route.srcIata);
        activeAirportIatas.add(route.dstIata);
      });

      setAirports(airportsData.filter((airport) => activeAirportIatas.has(airport.iata)));
      setRoutes(aucklandRoutes);

      setTimeout(() => {
        globeEl.current?.pointOfView(MAP_CENTER, 4000);
      }, 400);
    });
  }, []);

  const globeHeight = globeWidth > 0 ? Math.min(height, Math.max(320, globeWidth)) : height;

  return (
    <div
      ref={wrapperRef}
      className="bg-white/40 dark:bg-white/5 backdrop-blur min-w-0 overflow-hidden rounded-md border border-black/20 dark:border-white/10"
    >
      {globeWidth > 0 && (
        <Globe
          ref={globeEl}
          width={globeWidth}
          height={globeHeight}
          globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
          backgroundColor="rgba(0,0,0,0)"
          arcsData={routes}
          arcLabel={(route) => `${(route as RouteWithAirports).airline}: ${(route as RouteWithAirports).srcIata} -> ${(route as RouteWithAirports).dstIata}`}
          arcStartLat={(route) => Number((route as RouteWithAirports).srcAirport.lat)}
          arcStartLng={(route) => Number((route as RouteWithAirports).srcAirport.lng)}
          arcEndLat={(route) => Number((route as RouteWithAirports).dstAirport.lat)}
          arcEndLng={(route) => Number((route as RouteWithAirports).dstAirport.lng)}
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={1500}
          arcsTransitionDuration={0}
          arcColor={(route: object) => {
            const opacity = !hoverArc ? OPACITY : route === hoverArc ? 0.9 : OPACITY / 4;
            return [`rgba(0, 255, 0, ${opacity})`, `rgba(255, 0, 0, ${opacity})`];
          }}
          onArcHover={(arc) => setHoverArc((arc as RouteWithAirports | null) ?? null)}
          pointsData={airports}
          pointColor={() => "orange"}
          pointAltitude={0}
          pointRadius={0.04}
          pointsMerge={true}
        />
      )}
    </div>
  );
}
