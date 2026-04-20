export default function AboutMe() {
  return (
    <div data-swapy-handle className="bg-white/40 dark:bg-white/5 backdrop-blur cursor-grab active:cursor-grabbing w-full h-full p-2 border dark:border-white/10 border-black/20 rounded-md text-sm overflow-scroll">
      <p className="text-xl font-semibold mb-2">About me:</p>
      <p className="mb-2">
        Hey, I&apos;m a Full Stack developer and Year 13 student from New Zealand. I enjoy
        building clean, responsive, and user-friendly web applications, with experience 
        working with IoT projects.
      </p>
      <p className="mb-2">For projects, I mainly use:</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Next.js</li>
        <li>Python</li>
        <li>Thingsboard</li>
        <li>TailwindCSS</li>
        <li>TypeScript</li>
      </ul>
      <p className="mb-2">
        Besides programming, I also enjoy playing guitar and the whole music space in general.
        I&apos;m planning on going to University for Computer Science in the near future.
      </p>
      <p className="font-semibold">Feel free to reach out via email.</p>
    </div>
  );
}
