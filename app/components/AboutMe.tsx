export default function AboutMe() {
  return (
    <div className="w-[400px] max-[450px]:w-full h-full p-2 border-x border-y-2 dark:border-white/10 border-black/20 rounded-lg text-sm overflow-scroll">
      <p className="text-xl font-semibold mb-2">About me:</p>
      <p className="mb-2">
        I&apos;m Coen, a Front-end developer and student from New Zealand. I enjoy
        building clean, responsive, and user-friendly web applications.
      </p>
      <p className="mb-2">For projects, I mainly use:</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>React</li>
        <li>Next.js</li>
        <li>TailwindCSS</li>
        <li>TypeScript</li>
      </ul>
      <p className="mb-2">
        Besides coding, I have a passion for UI/UX design, and I’m always
        learning new technologies to improve my skills.
      </p>
      <p className="mb-2">In my free time, I enjoy:</p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Exploring new frameworks and libraries</li>
        <li>Contributing to open source projects</li>
        <li>Playing guitar and listening to music</li>
      </ul>
      <p className="font-semibold">Feel free to reach out via email.</p>
    </div>
  );
}
