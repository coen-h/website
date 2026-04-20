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

  return <iframe className="w-full" src={iframeSrc ?? undefined}></iframe>;
}
