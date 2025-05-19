"use client";

import { useEffect, useState } from "react";
import FileRepo from "./components/FileRepo";
import UserCard from "./components/UserCard";
import SpotifyWidget from "./components/SpotifyWidget";
import PortfolioCard from "./components/PortfolioCard";
import Clock from "./components/Clock";
import AboutMe from "./components/AboutMe";
import WeatherCard from "./components/WeatherCard";
import Contact from "./components/Contact";
import GlobeViz from "./components/Globe";

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

type SpotifyData = {
  content: string;
};

type GithubData = {
  dataRepo: RepoItem[];
  dataUser: UserItem;
  dataSpotify: SpotifyData;
};

interface HomeProps {
  githubData: GithubData;
}

export default function Home({ githubData }: HomeProps) {
  const [items, setItems] = useState<RepoItem[]>([]);
  const [user, setUser] = useState<UserItem | null>(null);

  useEffect(() => {
    if (githubData) {
      setItems(githubData.dataRepo);
      setUser(githubData.dataUser);
    }
  }, [githubData]);

  return (
    <div className="text-black dark:text-white w-screen h-screen p-2">
      <div className="p-2 w-full h-full flex flex-col justify-between backdrop-blur-md border-2 dark:border-white/10 border-black/20 rounded-xl bg-black/15 dark:bg-black/75">
        <div className="h-full flex justify-center gap-2">
          <div className="flex flex-col gap-2">
            <WeatherCard />
            {user && (<div className="max-[1200px]:flex hidden"><UserCard user={user} /></div>)}
            <Clock />
            <AboutMe />
            <Contact />
          </div>

          <div className="flex flex-col gap-2 max-[1200px]:hidden">
            {user && <UserCard user={user} />}
            {items && <FileRepo items={items} />}
            <GlobeViz height={550} width={550} />
          </div>

          <div className="flex flex-col gap-2 max-[800px]:hidden">
            {githubData.dataSpotify && <SpotifyWidget data={githubData.dataSpotify} />}
            <PortfolioCard />
          </div>
        </div>
      </div>
    </div>
  );
}
