import HomeClient from './Home';
import fetchGithub from './lib/fetchGithub';

export default async function Page() {
  const githubData = await fetchGithub();

  return (
    <HomeClient githubData={githubData} />
  );
}
