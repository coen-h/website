// import { useState, useEffect } from "react";

// type SpotifyData = {
//   content: string;
// };

export default function SpotifyWidget() {
  // const [iframeSrc, setIframeSrc] = useState<string | null>(null);

  // useEffect(() => {
  //   if (data?.content) {
  //     setIframeSrc(
  //       "data:text/html;charset=utf-8;base64," +
  //         encodeURIComponent(data.content)
  //     );
  //   }
  // }, [data]);

  return (
    <div className="h-32 bg-white/40 dark:bg-white/5 backdrop-blur border dark:border-white/10 border-black/20 rounded-md w-full p-1 flex flex-col items-center justify-between">
      <p className="text-sm text-neutral-700 dark:text-neutral-400 text-center">
        because of spotifys recent restrictions on their api, many developers no longer can use their api for projects, 
        with of course the exception being for premium users. 
        this is all without communication from spotify. use something better.
      </p>
      <a className="mb-2" target="_blank" href='https://monochrome.tf/'>- monochrome</a>
    </div>
    // <iframe className="bg-white/5 backdrop-blur w-full" src={iframeSrc ?? undefined}></iframe>
  );
}
