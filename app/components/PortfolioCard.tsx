import portfolio from "../assets/portfolio";

export default function PortfolioCard() {
  return (
    <div className="flex flex-col gap-4 overflow-scroll border-x border-y-2 border-white/10 rounded-lg p-2 flex-grow">
      {portfolio.map((item) => (
        <a
          href={item.link}
          key={item.name}
          className="flex flex-col items-center"
        >
          <img className="w-96 rounded-sm" src={item.image} />
          <div>
            <p className="text-2xl text-center">{item.name}</p>
            <p className="w-full text-center">{item.description}</p>
            <p className="text-center">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-950 text-white/50 rounded-lg px-2 py-1"
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
