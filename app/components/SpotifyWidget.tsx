import { useState, useEffect } from "react";

type SpotifyData = {
  content: string;
};

export default function SpotifyWidget({ data }: { data?: SpotifyData }) {
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);

  useEffect(() => {
    if (data?.content) {
      setIframeSrc(
        "data:text/html;charset=utf-8;base64," +
          encodeURIComponent(data.content)
      );
    }
  }, [data]);

  return <iframe className="w-full border-x border-y-2 dark:border-white/10 border-black/20 rounded-lg" src={iframeSrc ?? undefined}></iframe>;
}
