"use client";

import { useEffect, useState } from "react";
import FileRepo from "./components/FileRepo";
import UserCard from "./components/UserCard";
import SpotifyWidget from "./components/SpotifyWidget";
import PortfolioCard from "./components/PortfolioCard";
import WeatherCard from "./components/WeatherCard";
import GlobeViz from "./components/Globe";

export default function Home({ githubData }) {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (githubData) {
      console.log(githubData);
      setItems(githubData.dataRepo);
      setUser(githubData.dataUser);
    }
  }, [githubData]);

  return (
    <>
      <div className="text-white w-screen h-screen p-2">
        <div className="p-2 w-full h-full flex flex-col justify-between bg-black/75 backdrop-blur-md border-2 border-white/10 rounded-xl">
          <div className="h-full flex justify-center gap-2">

            <div className="flex flex-col gap-2">
              <WeatherCard />
            </div>

            <div className="flex flex-col gap-2">
              <UserCard user={user} />
              <FileRepo items={items} />
              <GlobeViz height={550} width={550} />
            </div>

            <div className="flex flex-col gap-2">
              <SpotifyWidget data={githubData.dataSpotify}/>
              <PortfolioCard />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
