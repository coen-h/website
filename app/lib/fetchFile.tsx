"use server";

export default async function fetchFile( repo: string, directory: string[]) {
  const responseFile = await fetch(`https://api.github.com/repos/coen-h/${repo}/contents/${directory.join('/')}`, { next: { revalidate: 3600 } });
  const dataFile = await responseFile.json();

  return { dataFile };
}
