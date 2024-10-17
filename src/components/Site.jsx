import { useEffect, useState } from 'react'
import Terminal from './Terminal'
import { generateGlobe1, generateGlobe2, generateSaturn, generateEarth, generateName } from './globeArt'

export default function Site() {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState([]);
    const [iframeSrc, setIframeSrc] = useState('');
    const [terminal, setTerminal] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('https://api.github.com/users/coen-h/repos');
            const data = await response.json();
            setItems(data);
        };

        const fetchUser = async () => {
            const response = await fetch('https://api.github.com/users/coen-h');
            const data = await response.json();
            setUser(data);
        };

        const fetchSpotify = async () => {
            const response = await fetch('https://api.github.com/repos/coen-h/spotify/contents/player.min.html');
            const data = await response.json();
            setIframeSrc("data:text/html;charset=utf-8;base64," + encodeURIComponent(data.content));
        };

        fetchItems();
        fetchUser();
        fetchSpotify();
    }, []);

    return (
    <>
        <div className='flex flex-col justify-between fixed w-[98vw] h-[96vh] p-[0.5rem] my-[2vh] mx-[1vw] bg-black bg-opacity-75 backdrop-blur-md border-2 border-white border-opacity-10 rounded-xl animate-loaded'>
            <div className='flex justify-between items-center gap-4'>
                <p className='text-4xl underline max-xs:text-3xl'>Welcome</p>
                <div className='flex justify-center gap-2 items-center'>
                    <a href="mailto:me@coen.ovh" target="_blank">
                        <img className='w-10 h-10 opacity-50 hover:opacity-100' src="/mail.svg" />
                    </a>
                    <a href="https://github.com/coen-h" target="_blank">
                        <img className='w-8 h-8 opacity-50 hover:opacity-100' src="/github.svg" />
                    </a>
                    <a href="https://t.me/coen_h" target="_blank">
                        <img className='w-8 h-8 opacity-50 hover:opacity-100' src="/telegram.svg" />
                    </a>
                    <a href="https://discordapp.com/users/676659509711732737" target="_blank">
                        <img className='w-10 h-10 opacity-50 hover:opacity-100' src="/discord.svg" />
                    </a>
                </div>
            </div>
            <div className='flex justify-center gap-5'>
                <div className='flex flex-col items-center justify-center w-3/5 border-2 border-white border-opacity-10 rounded-lg py-2 max-lg:hidden'>
                    <div className='flex items-center justify-center gap-4'>
                        <p className='text-2xl'>Hi, My name is</p>
                        <pre className='text-[8px] leading-none [text-shadow:_0_0_5px_rgb(0_255_0_/_40%)]'>{generateName()}</pre>
                    </div>
                    <pre className='text-[1.5vh] leading-[1.6vh]'>{generateSaturn()}</pre>
                    <div className='flex flex-col gap-1'>
                        <p className='text-center'>Auckland, New Zealand</p>
                        <p className='text-xs text-center'>&quot;Worry never robs tomorrow of its sorrow, it only saps today of its joy.&quot;</p>
                    </div>
                </div>
                <div className='flex flex-col gap-5 max-xl:hidden max-lg:flex'>
                    <div className='border-2 border-white border-opacity-10 rounded-lg py-2'>
                        <div className='flex gap-4 justify-center'>
                            <img className='w-16 h-16 rounded-full' src={user.avatar_url}/>
                            <div>
                                <p className='text-xl'>{user.name}</p>
                                <p>{user.bio}</p>
                                <div className='flex gap-4 justify-center'>
                                    <div className='flex flex-col'>
                                        <p className='text-center'>{user.public_repos}</p>
                                        <p className='font-light text-gray-300 text-sm'>Repos</p>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='text-center'>{user.followers}</p> 
                                        <p className='font-light text-gray-300 text-sm'>Followers</p>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='text-center'>{user.following}</p>
                                        <p className='font-light text-gray-300 text-sm'>Following</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{height: "calc(96vh - 208px)"}} className='flex flex-col-reverse gap-3 overflow-scroll border-2 border-white border-opacity-10 rounded-lg p-2'>
                            {items.map((item) => (
                                <a className='border-2 border-opacity-20 p-1 border-white rounded-xl' key={item.name} href={item.html_url}>
                                    <div className='text-center'>
                                        <p className='text-xl'>{item.name}</p>
                                        <p>{item.description || 'No description provided'}</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p>{item.stargazers_count} Stars</p>
                                        <p>{item.open_issues} Issues</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-5 max-md:hidden'>
                    <iframe className='w-full rounded-lg' src={iframeSrc}></iframe>
                    <div style={{height: "calc(96vh - 243px)"}} className='overflow-scroll border-2 border-white border-opacity-10 rounded-lg p-2'>
                        <div className='pb-2'>
                            <img className='w-full rounded-lg' src='/zmov.jpg' />
                            <div>
                                <p className='text-2xl text-center'>zmov</p>
                                <p className='w-full text-center'>My movie site made using React, Vite, and the TMDB API.</p>
                            </div>
                        </div>
                        <div className='pb-4'>
                            <img className='w-full rounded-lg' src='/website.jpg' />
                            <div>
                                <p className='text-2xl text-center'>My Website</p>
                                <p className='w-full text-center'>The website you are on right now, now remade using React.</p>
                            </div>
                        </div>
                        <button onClick={() => setTerminal(prevTerminal => !prevTerminal)} className='w-full h-10 rounded-lg bg-white bg-opacity-15 hover:bg-opacity-30 animate-pulse'>TERMINAL?</button>
                    </div>
                </div>
            </div>
        </div>
        {terminal && <Terminal setTerminal={setTerminal}/>}
    </>
    )
}