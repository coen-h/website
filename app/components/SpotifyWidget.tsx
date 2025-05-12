import { useState, useEffect } from "react";

export default function SpotifyWidget({ data }: { data: any }) {
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);

  useEffect(() => {
    if (data?.content) {
      setIframeSrc(
        "data:text/html;charset=utf-8;base64," +
          encodeURIComponent(data.content)
      );
    }
  }, [data]);

  return <iframe className="w-full rounded-lg" src={iframeSrc}></iframe>;
}
