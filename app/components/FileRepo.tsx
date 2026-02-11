import { useEffect, useState } from "react";
import fetchFile from "../lib/fetchFile";

type RepoItem = {
  name: string;
  stargazers_count: number;
  open_issues: number;
  forks: number;
  license?: { spdx_id?: string };
};

type FileItem = {
  name: string;
  type: "file" | "dir";
  html_url?: string;
  size?: number;
};

export default function FileRepo({ items }: { items: RepoItem[] }) {
  const [file, setFile] = useState<FileItem[]>([]);
  const [fileRepo, setFileRepo] = useState<string>("");
  const [fileDirectory, setFileDirectory] = useState<string[]>([]);

  useEffect(() => {
    if (fileRepo) {
      setFile([]);
      fetchFile(fileRepo, fileDirectory).then((data) => {
        console.log(data);
        const dataFile = data.dataFile;

        if (Array.isArray(dataFile)) {
          setFile(dataFile);
        } else if (
          dataFile?.message === "This repository is empty." &&
          dataFile?.status === "404"
        ) {
          setFile([]);
        } else {
          setFile([]);
          console.error("Unexpected dataFile response:", dataFile);
        }
      });
    }
  }, [fileRepo, fileDirectory]);

  return (
    <div className="border-x border-y-2 dark:border-white/10 border-black/20 rounded-lg overflow-scroll flex-grow max-[1200px]:hidden">
      <div className="absolute flex backdrop-blur-md gap-1.5 items-center p-1 rounded-lg">
        <a className={`${!fileRepo ? 'opacity-25' : 'opacity-100 hover:cursor-pointer'} pl-0.5`} onClick={() => fileDirectory.length  ? setFileDirectory(prevDirectory => prevDirectory.slice(0, -1)) : setFileRepo('')}>
          <svg className="fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height='24px'><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
        </a>
        <p className="p-1 rounded-md bg-neutral-500/20 w-[513px] max-[1400px]:w-[400px]">/repos/{fileRepo ? fileRepo + '/' : ''}{fileDirectory.join('/')}</p>
      </div>
      <div className="flex flex-col-reverse mt-9 p-2">
        {fileRepo === '' ? items.map((item) => (
          <a key={item.name} className="flex justify-between hover:cursor-pointer hover:bg-white/25 p-0.5 rounded-md" onClick={() => setFileRepo(item.name)}>
            <p>{item.name}</p>
            <div className="flex gap-1 text-center">
              <p className="border dark:border-white/30 border-black/50 flex gap-1 rounded-lg px-1 items-center justify-center min-w-12.5">{item.stargazers_count} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height="16" className="fill-yellow-400"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg></p>
              <p className="border dark:border-white/30 border-black/50 flex gap-1 rounded-lg px-1 items-center justify-center min-w-12.5">{item.open_issues} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="16" className="fill-black dark:fill-white"><path d="M256 16C123.461 16 16 123.42 16 256S123.461 496 256 496S496 388.58 496 256S388.539 16 256 16ZM256 448C150.131 448 64 361.869 64 256S150.131 64 256 64S448 150.131 448 256S361.869 448 256 448ZM256 192C220.674 192 192 220.75 192 256S220.674 320 256 320S320 291.25 320 256S291.326 192 256 192Z"/></svg></p>
              <p className="border dark:border-white/30 border-black/50 flex gap-1 rounded-lg px-1 items-center justify-center min-w-12.5">{item.forks} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16" className="fill-black dark:fill-white"><path d="M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3l0 38.7c0 17.7 14.3 32 32 32l160 0c17.7 0 32-14.3 32-32l0-38.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3l0 38.7c0 53-43 96-96 96l-48 0 0 70.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3l0-70.7-48 0c-53 0-96-43-96-96l0-38.7C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm208 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM248 432a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z"/></svg></p>
              <p className="border dark:border-white/30 border-black/50 flex gap-1 rounded-lg px-1 items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" height="16" className={`${item.license?.spdx_id ? 'fill-black dark:fill-white' : 'fill-neutral-400 dark:fill-neutral-700'}`}><path d="M384 32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L398.4 96c-5.2 25.8-22.9 47.1-46.4 57.3L352 448l160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0-192 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0 0-294.7c-23.5-10.3-41.2-31.6-46.4-57.3L128 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l128 0c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zm55.6 288l144.9 0L512 195.8 439.6 320zM512 416c-62.9 0-115.2-34-126-78.9c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C627.2 382 574.9 416 512 416zM126.8 195.8L54.4 320l144.9 0L126.8 195.8zM.9 337.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C242 382 189.7 416 126.8 416S11.7 382 .9 337.1z"/></svg></p>
            </div>
          </a>
        )) : file.map((item) => (
          <a key={item.name} className="flex justify-between hover:cursor-pointer hover:bg-white/25 p-0.5 rounded-md" href={item.type === 'file' ? item.html_url : undefined} target='_blank' rel='noopener noreferrer' onClick={() => item.type === 'dir' ? setFileDirectory(prevDirectory => [...prevDirectory, item.name]) : ''}>
            <div className="flex gap-1">
              <p>{item.type === 'dir' ? 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-black dark:fill-white" height='20px'><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="fill-black dark:fill-white" height='20px'><path d="M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"/></svg>
              }</p>
              <p>{item.name}</p>
            </div>
            <p>{item.size}</p>
          </a>
        ))}
      </div>
    </div>
  )
}