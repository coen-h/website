import Image from "next/image";
import portfolio from "../assets/portfolio";

export default function PortfolioCard() {
  return (
    <div className="flex flex-col gap-4 overflow-scroll border-x border-y-2 dark:border-white/10 border-black/20 rounded-lg p-2 flex-grow">
      {portfolio.map((item) => (
        <a
          href={item.link}
          key={item.name}
          className="flex flex-col items-center"
          target="_blank"
        >
          <Image className="rounded-md" src={item.image} alt={item.name} width={384} height={384} unoptimized />
          <div>
            <p className="text-2xl text-center">{item.name}</p>
            <p className="w-full text-center mb-1">{item.description}</p>
            <p className="flex items-center justify-center gap-1 text-center">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-neutral-950/15 dark:bg-white/10 text-black/50 dark:text-white/50 rounded-lg px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
