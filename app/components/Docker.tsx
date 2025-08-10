const services = [
  {
    id: 1,
    name: "Immich | Image",
    image: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 792 792"
        className="h-10"
      >
        <g>
          <path
            className="fill-[#FA2921]"
            d="M375.48,267.63c38.64,34.21,69.78,70.87,89.82,105.42c34.42-61.56,57.42-134.71,57.71-181.3
          c0-0.33,0-0.63,0-0.91c0-68.94-68.77-95.77-128.01-95.77s-128.01,26.83-128.01,95.77c0,0.94,0,2.2,0,3.72
          C300.01,209.24,339.15,235.47,375.48,267.63z"
          />
          <path
            className="fill-[#ED79B5]"
            d="M164.7,455.63c24.15-26.87,61.2-55.99,103.01-80.61c44.48-26.18,88.97-44.47,128.02-52.84
          c-47.91-51.76-110.37-96.24-154.6-110.91c-0.31-0.1-0.6-0.19-0.86-0.28c-65.57-21.3-112.34,35.81-130.64,92.15
          c-18.3,56.34-14.04,130.04,51.53,151.34C162.05,454.77,163.25,455.16,164.7,455.63z"
          />
          <path
            className="fill-[#FFB400]"
            d="M681.07,302.19c-18.3-56.34-65.07-113.45-130.64-92.15c-0.9,0.29-2.1,0.68-3.54,1.15
          c-3.75,35.93-16.6,81.27-35.96,125.76c-20.59,47.32-45.84,88.27-72.51,118c69.18,13.72,145.86,12.98,190.26-1.14
          c0.31-0.1,0.6-0.2,0.86-0.28C695.11,432.22,699.37,358.52,681.07,302.19z"
          />
          <path
            className="fill-[#1E83F7]"
            d="M336.54,510.71c-11.15-50.39-14.8-98.36-10.7-138.08c-64.03,29.57-125.63,75.23-153.26,112.76
          c-0.19,0.26-0.37,0.51-0.53,0.73c-40.52,55.78-0.66,117.91,47.27,152.72c47.92,34.82,119.33,53.54,159.86-2.24
          c0.56-0.76,1.3-1.78,2.19-3.01C363.28,602.32,347.02,558.08,336.54,510.71z"
          />
          <path
            className="fill-[#18C249]"
            d="M617.57,482.52c-35.33,7.54-82.42,9.33-130.72,4.66c-51.37-4.96-98.11-16.32-134.63-32.5
          c8.33,70.03,32.73,142.73,59.88,180.6c0.19,0.26,0.37,0.51,0.53,0.73c40.52,55.78,111.93,37.06,159.86,2.24
          c47.92-34.82,87.79-96.95,47.27-152.72C619.2,484.77,618.46,483.75,617.57,482.52z"
          />
        </g>
      </svg>
    ),
    url: "https://image.coen.ovh",
  },
  {
    id: 2,
    name: "Beszel | Monitoring",
    image: (
      <svg
        className="h-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <linearGradient
          id="beszel_svg__a"
          x1="433.391"
          x2="-10.605"
          y1="446.179"
          y2="73.621"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" style={{ stopColor: "#52cf83" }} />
          <stop offset=".63" style={{ stopColor: "#6d98d2" }} />
          <stop offset="1" style={{ stopColor: "#7b7bfc" }} />
        </linearGradient>
        <path
          d="M307.2 512h-256V0h256c21.5 0 41.4 4.1 60 12.4 18 7.8 34.4 19 48.3 32.9C429.6 59 440.6 75 448.4 93.6c8.3 19 12.4 39 12.4 60 .1 7.9-.6 15.7-2.2 23.4-.4 2-.9 3.9-1.5 5.9-2.6 10.1-6.2 19.9-11 29.3-4.8 9-10.7 17.3-17.6 24.9-5.6 6.4-12 12.1-19 16.8-1 .8-1.9 1.5-2.9 2.2q12.45 7.35 21.9 18.3c6.8 7.8 12.7 16.3 17.6 25.6 4.8 9.3 8.5 19.1 11 29.3 1.9 7.2 3.1 14.5 3.7 21.9.1 2.4.1 4.9 0 7.3 0 21.5-4.1 41.4-12.4 60-7.8 18-19 34.4-32.9 48.3-13.7 14.1-29.7 25.4-48.3 33.6-18.6 7.7-38.6 11.6-60 11.6M153.6 102.4v102.4h153.6c5.7.2 11.4-.5 16.8-2.2 1-.5 2-.9 2.9-1.5 6.3-2.4 11.9-6.1 16.8-11 4.7-4.6 8.4-10.1 11-16.1 2.4-6.3 3.7-13.2 3.7-20.5 0-5.7-1-11.4-2.9-16.8-.2-1-.5-2-.7-2.9-2.9-6.3-6.6-11.9-11-16.8-4.9-4.5-10.6-7.9-16.8-10.2-5.8-2.6-12-4.1-18.3-4.4zm0 204.8v102.4h153.6c5.7 0 11.4-1 16.8-2.9 1-.2 2-.5 2.9-.7 6.3-2.9 11.9-6.6 16.8-11 4.7-4.6 8.4-10.1 11-16.1 2.4-6 3.7-12.5 3.7-19v-1.5c0-5.7-1-11.4-2.9-16.8-.2-1-.5-2-.7-2.9-2.9-6.3-6.6-11.9-11-16.8-4.8-4.7-10.5-8.5-16.8-11-5.8-2.6-12-4.1-18.3-4.4H153.6z"
          style={{ fill: "url(#beszel_svg__a)" }}
        />
      </svg>
    ),
    url: "https://monitor.coen.ovh",
  },
  {
    id: 3,
    name: "Uptime Kuma | Uptime",
    image: (
      <svg
        className="h-10"
        viewBox="0 0 640 640"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="matrix(1 0 0 1 320 320)">
          <linearGradient
            id="S3"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(1 0 0 1 -319.99875 -320.0001577393)"
            x1="259.78"
            y1="261.15"
            x2="463.85"
            y2="456.49"
          >
            <stop stopColor="#5CDD8B" />
            <stop offset="1" stopColor="#86E6A9" />
          </linearGradient>
          <path
            style={{
              stroke: "rgb(242,242,242)",
              strokeOpacity: 0.51,
              strokeWidth: 200,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "url(#S3)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" translate(0, 0)"
            d="M 170.40125 -84.36016 C 224.09125 38.37984 224.09125 115.33984 170.40125 146.49984 C 89.85125000000001 193.23984000000002 -120.03875 207.48984000000002 -180.45875 135.63984 C -220.73875 87.73983999999999 -220.73875 14.399839999999998 -180.45875 -84.36016000000001 C -139.49875 -151.82016 -81.28875000000001 -185.55016 -5.828750000000014 -185.55016 C 69.64124999999999 -185.55016 128.38125 -151.82016000000002 170.40124999999998 -84.36016000000001 z"
            strokeLinecap="round"
          />
        </g>
      </svg>
    ),
    url: "https://status.coen.ovh/status/all",
  },
  {
    id: 4,
    name: "Copyparty | File",
    image: (
      <svg
        viewBox="0 0 300 207"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10"
      >
        <defs>
          <linearGradient id="linearGradient1">
            <stop stopColor="#ffcc55" offset="0" />
            <stop stopColor="#ffcc00" offset="0.2" />
            <stop stopColor="#ff8800" offset="1" />
          </linearGradient>
          <linearGradient
            xlinkHref="#linearGradient1"
            id="linearGradient2"
            x1="15"
            y1="15"
            x2="15"
            y2="143"
            gradientUnits="userSpaceOnUse"
          />
        </defs>

        <rect fill="#333" width="300" height="205" rx="12" ry="12" />
        <rect
          fill="url(#linearGradient2)"
          width="270"
          height="128"
          x="15"
          y="15"
          rx="8"
          ry="8"
        />
        <rect
          fill="#333"
          width="172"
          height="52"
          x="64"
          y="72"
          rx="26"
          ry="26"
        />
        <circle fill="#ccc" cx="91" cy="98" r="18" />
        <circle fill="#ccc" cx="209" cy="98" r="18" />
        <path
          fill="#737373"
          d="m 48,207 10,-39 c 1.79,-6.2 5.6,-7.8 12,-8 60,-1 100,-1 160,0 6.4,0.2 10,1.8 12,8 l 10,39 z"
        />

        <g>
          <path
            fill="#333"
            d="m 111.4,83.335 -9.526,5.5 2.5,4.33 9.526,-5.5 z m -33.775,19.5 -9.526,5.5 2.5,4.33 9.526,-5.5 z"
          />
          <path
            fill="#333"
            d="M 88.5,73 V 84 h 5 V 73 Z m 0,39 v 11 h 5 V 112 Z"
          />
          <path
            fill="#333"
            d="m 68.1,87.665 9.526,5.5 2.5,-4.33 -9.526,-5.5 z m 33.775,19.5 9.527,5.5 2.5,-4.33 -9.527,-5.5 z"
          />
        </g>

        <g transform="rotate(30,150,318.19)">
          <path
            fill="#333"
            d="m 111.4,83.335 -9.526,5.5 2.5,4.33 9.526,-5.5 z m -33.775,19.5 -9.526,5.5 2.5,4.33 9.526,-5.5 z"
          />
          <path
            fill="#333"
            d="M 88.5,73 V 84 h 5 V 73 Z m 0,39 v 11 h 5 V 112 Z"
          />
          <path
            fill="#333"
            d="m 68.1,87.665 9.526,5.5 2.5,-4.33 -9.526,-5.5 z m 33.775,19.5 9.527,5.5 2.5,-4.33 -9.527,-5.5 z"
          />
        </g>
      </svg>
    ),
    url: "https://files.coen.ovh",
  },
];

export default function Clock() {
  return (
    <div className="flex flex-col justify-between border-x border-y-2 dark:border-white/10 border-black/20 rounded-lg p-1 gap-1">
      {services.map((service) => (
        <a
          key={service.id}
          className="flex p-0.5 justify-center gap-2 items-center border dark:border-white/10 border-black/20 rounded-lg"
          href={service.url}
          target="_blank"
        >
          {service.image}
          <p>{service.name}</p>
        </a>
      ))}
    </div>
  );
}
