"use server";

export default async function fetchGithub() {
  const responseRepo = await fetch("https://api.github.com/users/coen-h/repos", { next: { revalidate: 3600 } });
  const dataRepo = await responseRepo.json();

  const responseUser = await fetch("https://api.github.com/users/coen-h", { next: { revalidate: 3600 } });
  const dataUser = await responseUser.json();

  const responseSpotify = await fetch("https://api.github.com/repos/coen-h/spotify/contents/player.min.html", { next: { revalidate: 3600 } });
  const dataSpotify = await responseSpotify.json();
  return { dataRepo, dataUser, dataSpotify };
}
