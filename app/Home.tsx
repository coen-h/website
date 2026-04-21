"use client";

import { createSwapy } from 'swapy'
import { ReactNode, useEffect, useRef, useState } from "react";
import FileRepo from "./components/FileRepo";
import UserCard from "./components/UserCard";
import SpotifyWidget from "./components/SpotifyWidget";
import PortfolioCard from "./components/PortfolioCard";
import Clock from "./components/Clock";
import AboutMe from "./components/AboutMe";
import WeatherCard from "./components/WeatherCard";
import Contact from "./components/Contact";
import GlobeViz from "./components/Globe";
import Docker from "./components/Docker";

type RepoItem = {
  name: string;
  stargazers_count: number;
  open_issues: number;
  forks: number;
  license?: { spdx_id?: string };
};

type UserItem = {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at?: string;
};

type GithubData = {
  dataRepo: RepoItem[];
  dataUser: UserItem;
};

interface HomeProps {
  githubData: GithubData;
}

function SwapySection({
  slot,
  item,
  className = "",
  children,
}: {
  slot: string;
  item: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div data-swapy-slot={slot} className={`swapy-slot ${className}`.trim()}>
      <div data-swapy-item={item} className="swapy-item">
        {children}
      </div>
    </div>
  );
}

export default function Home({ githubData }: HomeProps) {
  const [items, setItems] = useState<RepoItem[]>([]);
  const [user, setUser] = useState<UserItem | null>(null);
  const swapy = useRef<ReturnType<typeof createSwapy> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (githubData) {
      setItems(githubData.dataRepo);
      setUser(githubData.dataUser);
    }
  }, [githubData]);

  useEffect(() => {
    if (container.current) {
      swapy.current = createSwapy(container.current, {
        animation: 'dynamic', 
      });
    }

    return () => {
      swapy.current?.destroy();
      swapy.current = null;
    };
  }, []);

  return (
    <div className="crt-shell h-screen w-screen p-2 text-black dark:text-white">
      <div className="crt-content flex h-full flex-col justify-between overflow-hidden rounded-xl border-2 border-black/20 bg-black/40 p-2 backdrop-blur-md dark:border-white/10 dark:bg-black/75">
        <img
          src="https://i.redd.it/4ykpisubwlb91.jpg"
          className="pointer-events-none absolute inset-0 h-screen w-screen object-cover opacity-25 select-none dark:hidden"
          alt=""
        />
        <img
          src="https://img.goodfon.com/original/2560x1600/0/9f/new-zealand-beach-sunset.jpg"
          className="pointer-events-none absolute inset-0 hidden h-screen w-screen object-cover opacity-25 select-none dark:block"
          alt=""
        />
        <div className="flex h-full w-full justify-center gap-2 overflow-hidden" ref={container}>
          <div className="swapy-column w-full max-w-[400px] h-full flex flex-col">
            {/* <SwapySection slot="weather-slot" item="weather-item" className="w-full shrink-0"> */}
              <WeatherCard />
            {/* </SwapySection> */}
            {user && (<div className="max-[1400px]:flex hidden"><UserCard user={user} /></div>)}
            {/* <SwapySection slot="clock-slot" item="clock-item" className="w-full shrink-0"> */}
              <Clock />
            {/* </SwapySection> */}
            <SwapySection slot="about-slot" item="about-item" className="swapy-slot-fill">
              <AboutMe />
            </SwapySection>
            
            {/* <SwapySection slot="contact-slot" item="contact-item" className="w-full shrink-0"> */}
              <Contact />
            {/* </SwapySection> */}
          </div>

          <div className='max-[1400px]:hidden'>
            <div className="swapy-column w-full max-w-[550px] h-full flex flex-col">
              {user && 
              // <SwapySection slot="user-slot" item="user-item">
                  <UserCard user={user} />
              // </SwapySection>
              }
              {items && 
                <SwapySection slot="file-slot" item="file-item" className="swapy-slot-fill">
                  <FileRepo items={items} />
                </SwapySection>
              }
              {/* <SwapySection slot="globe-slot" item="globe-item"> */}
                <GlobeViz height={550} />
            {/* </SwapySection> */}
            </div>
          </div>
          

          <div className='max-[900px]:hidden'>
            <div className="swapy-column w-full max-w-[450px] h-full flex flex-col">
            {/* {githubData.dataSpotify && 
              <SwapySection slot="spotify-slot" item="spotify-item"> */}
                <SpotifyWidget />
              {/* </SwapySection>
            } */}
            <SwapySection slot="portfolio-slot" item="portfolio-item" className="swapy-slot-fill">
              <PortfolioCard />
            </SwapySection>
            {/* <SwapySection slot="docker-slot" item="docker-item" className="w-full shrink-0"> */}
              <Docker />
            {/* </SwapySection> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
