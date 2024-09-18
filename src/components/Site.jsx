import { useEffect, useState } from 'react'

const generateGlobe = () => {
    return `
-o#&&*''''?d:>b\\_
_o/"\`''  '',, dMF9MMMMMHo_
.o&#'        \`"MbHMMMMMMMMMMMHo.
.o"" '         vodM*$&&HMMMMMMMMMM?.
,'              $M&ood,~'\`(&##MMMMMMH\\
/               ,MMMMMMM#b?#bobMMMMHMMML
&              ?MMMMMMMMMMMMMMMMM7MMM$R*Hk
?$.            :MMMMMMMMMMMMMMMMMMM/HMMM|\`*L
|               |MMMMMMMMMMMMMMMMMMMMbMH'   T,
$H#:            \`*MMMMMMMMMMMMMMMMMMMMb#}'  \`?
]MMH#             ""*""""*#MMMMMMMMMMMMM'    -
MMMMMb_                   |MMMMMMMMMMMP'     :
HMMMMMMMHo                 \`MMMMMMMMMT       .
?MMMMMMMMP                  9MMMMMMMM}       -
-?MMMMMMM                  |MMMMMMMMM?,d-    '
:|MMMMMM-                 \`MMMMMMMT .M|.   :
.9MMM[                    &MMMMM*' \`'    .
:9MMk                    \`MMM#"        -
&M}                     \`          .-
\`&.                             .
\`~,   .                     ./
. _                  .-
'\`--._,dd###pp=""'
    `;
}

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
        <div id="site" className='w-11/12 h-5/6 bg-black'>
            <div className='flex justify-between items-center'>
                <p className='text-3xl underline'>Welcome</p>
            </div>
            <div className='flex content-center gap-5'>
                <div className='flex flex-col items-center'>
                    <p className='text-2xl'>Hi, My names Coen.</p>
                    <pre>{generateGlobe()}</pre>
                    <div className='flex flex-col gap-1'>
                        <p>Auckland, New Zealand</p>
                        <p className='text-xs'>&quot;Worry never robs tomorrow of its sorrow, it only saps today of its joy.&quot;</p>
                    </div>
                </div>
                <div>
                    <div>
                        <div className='flex gap-4 content-center'>
                            <img src={user.avatar_url}/>
                            <div>
                                <p className='text-xl'>{user.name}</p>
                                <p>{user.bio}</p>
                            </div>
                        </div>
                        <div className='flex content-center items-center'>
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
                        <div className='flex flex-col-reverse gap-5'>
                            {items.map((item) => (
                                <a key={item.name} href={item.html_url}>
                                    <div className='text-center border-b-gray-700'>
                                        <p className='text-xl'>{item.name}</p>
                                        <p>{item.description || 'No description provided'}</p>
                                    </div>
                                    <div className='flex content-between'>
                                        <p>{item.stargazers_count} Stars</p>
                                        <p>{item.open_issues} Issues</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <iframe src={iframeSrc}></iframe>
                    <div>
                        <div className='border-b-gray-800 pb-5'>
                            <img className='w-full border-r-8' src='/zmov.jpg' />
                            <div>
                                <p className='text-2xl'>zmov</p>
                                <p className='w-96'>My movie site made using React, Vite, and the TMDB API.</p>
                            </div>
                        </div>
                        <div className='border-b-gray-800 pb-5'>
                            <img className='w-full border-r-8' src='/website.jpg' />
                            <div>
                                <p className='text-2xl'>My Website</p>
                                <p className='w-96'>The website you are on right now, now remade using React.</p>
                            </div>
                        </div>
                        <p className='text-2xl underline'>MORE COMING SOON</p>
                    </div>
                </div>
            </div>
            <div>
                <p>work in progress :)</p>
            </div>
        </div>
    )
}