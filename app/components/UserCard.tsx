import Image from "next/image";

type UserItem = {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at?: string;
};

export default function UserCard({ user }: { user: UserItem }) {
  return (
    <div className="max-[1200px]:w-[400px] max-[450px]:w-full border-x border-y-2 dark:border-white/10 border-black/20 rounded-lg p-2">
      <div className="flex gap-4 justify-between">
        <div className="flex gap-2">
          <Image className="rounded-full max-[1200px]:hidden" unoptimized src={user.avatar_url} alt={user.name} width={96} height={96} />
          <div className="flex flex-col justify-center">
            <p>{user.name}</p>
            <p className="dark:text-neutral-500 text-neutral-600">@{user.login}</p>
            <p className="w-40 max-[1200px]:w-full text-sm line-clamp-2">{user.bio}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between max-[450px]:hidden">
          <div className="flex gap-2 items-center">
            <div className="flex flex-col text-center">
              <p>{user.public_repos}</p>
              <p className="dark:text-neutral-500 text-neutral-600">Repos</p>
            </div>
            <div className="flex flex-col text-center">
              <p>{user.followers}</p>
              <p className="dark:text-neutral-500 text-neutral-600">Followers</p>
            </div>
            <div className="flex flex-col text-center">
              <p>{user.following}</p>
              <p className="dark:text-neutral-500 text-neutral-600">Following</p>
            </div>
          </div>
          <div className="flex gap-1 self-end items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="20" fill="#737373"><path d="M384 64H344V24C344 10.75 333.25 0 320 0S296 10.75 296 24V64H152V24C152 10.75 141.25 0 128 0S104 10.75 104 24V64H64C28.654 64 0 92.652 0 128V448C0 483.348 28.654 512 64 512H384C419.346 512 448 483.348 448 448V128C448 92.652 419.346 64 384 64ZM400 448C400 456.824 392.822 464 384 464H64C55.178 464 48 456.824 48 448V192H400V448ZM120 304H328C341.25 304 352 293.25 352 280S341.25 256 328 256H120C106.75 256 96 266.75 96 280S106.75 304 120 304ZM120 400H232C245.25 400 256 389.25 256 376S245.25 352 232 352H120C106.75 352 96 362.75 96 376S106.75 400 120 400Z" /></svg>
            <p className="bg-gradient-to-r from-neutral-500 dark:to-neutral-100 to-neutral-900 text-transparent bg-clip-text">
              Joined {user.created_at?.slice(0, 10)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
