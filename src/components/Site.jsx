import { useEffect, useState } from 'react'
import { generateGlobe1, generateGlobe2, generateEarth } from './globeArt'

export default function Site() {
    const [items, setItems] = useState([]);
    const [user, setUser] = useState([]);
    const [iframeSrc, setIframeSrc] = useState('');

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
        <div className='flex flex-col justify-between fixed w-[96vw] h-[92vh] py-[0.5vh] px-[1vw] my-[4vh] mx-[2vw] bg-black bg-opacity-75 backdrop-blur-md border-2 border-white border-opacity-10 rounded-xl'>
            <div className='flex justify-between items-center'>
                <p className='text-3xl underline'>Welcome</p>
            </div>
            <div className='flex justify-center gap-5'>
                <div className='flex flex-col items-center justify-center w-3/5'>
                    <p className='text-2xl'>Hi, My names Coen.</p>
                    <pre className='text-center text-[0.8vw]'>{generateGlobe3()}</pre>
                    <div className='flex flex-col gap-1'>
                        <p className='text-center'>Auckland, New Zealand</p>
                        <p className='text-xs text-center'>&quot;Worry never robs tomorrow of its sorrow, it only saps today of its joy.&quot;</p>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div className='border-2 border-white border-opacity-10 rounded-lg py-2'>
                        <div className='flex gap-4 justify-center'>
                            <img className='w-16 h-16 rounded-full' src={user.avatar_url}/>
                            <div>
                                <p className='text-xl'>{user.name}</p>
                                <p>{user.bio}</p>
                            </div>
                        </div>
                        <div className='flex justify-center gap-2 items-center'>
                            <a href="mailto:me@coen.ovh" target="_blank">
                                <img className='w-10 h-10 mr-2 mb-1' src="/mail.svg" />
                            </a>
                            <a href="https://github.com/coen-h" target="_blank">
                                <img className='w-9 h-9 mr-2' style={{width: "35px", height: "35px", marginRight: "10px"}} src="/github.svg" />
                            </a>
                            <a href="https://t.me/coen_h" target="_blank">
                                <img className='w-9 h-9 mr-1' style={{width: "35px", height: "35px", marginRight: "5px"}} src="/telegram.svg" />
                            </a>
                            <a href="https://discordapp.com/users/676659509711732737" target="_blank">
                                <img className='w-11 h-11' src="/discord.svg" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <div style={{height: "calc(92vh - 220px)"}} className='flex flex-col-reverse gap-5 overflow-scroll border-2 border-white border-opacity-10 rounded-lg p-2'>
                            {items.map((item) => (
                                <a key={item.name} href={item.html_url}>
                                    <div className='text-center border-b-gray-700'>
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
                <div className='flex flex-col gap-5'>
                    <iframe className='w-full' src={iframeSrc}></iframe>
                    <div style={{height: "calc(92vh - 243px)"}} className='overflow-scroll border-2 border-white border-opacity-10 rounded-lg p-2'>
                        <div className='border-b-gray-800 pb-5'>
                            <img className='w-full border-r-8' src='/zmov.jpg' />
                            <div>
                                <p className='text-2xl text-center'>zmov</p>
                                <p className='w-full text-center'>My movie site made using React, Vite, and the TMDB API.</p>
                            </div>
                        </div>
                        <div className='border-b-gray-800 pb-5'>
                            <img className='w-full border-r-8' src='/website.jpg' />
                            <div>
                                <p className='text-2xl text-center'>My Website</p>
                                <p className='w-full text-center'>The website you are on right now, now remade using React.</p>
                            </div>
                        </div>
                        <p className='text-2xl underline text-center'>MORE COMING SOON</p>
                    </div>
                </div>
            </div>
            <div>
                <p>work in progress :)</p>
            </div>
        </div>
    )
}