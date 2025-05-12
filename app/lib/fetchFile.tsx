"use server";

export default async function fetchFile( repo: string, directory: string[]) {
  const responseFile = await fetch(`https://api.github.com/repos/coen-h/${repo}/contents${directory.join('/')}`);
  const dataFile = await responseFile.json();

  return { dataFile };
}
