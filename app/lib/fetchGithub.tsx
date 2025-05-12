"use server";

export default async function fetchGithub() {
  const responseRepo = await fetch("https://api.github.com/users/coen-h/repos");
  const dataRepo = await responseRepo.json();

  const responseUser = await fetch("https://api.github.com/users/coen-h");
  const dataUser = await responseUser.json();

  const responseSpotify = await fetch(
    "https://api.github.com/repos/coen-h/spotify/contents/player.min.html"
  );
  const dataSpotify = await responseSpotify.json();
  return { dataRepo, dataUser, dataSpotify };
}
