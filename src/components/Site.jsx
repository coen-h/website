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

const stopSite = () => {
    const site = document.getElementById("site");
    site.style.display = "none";
}

export default function Site() {
    const [items, setItems] = useState([]);
    const [iframeSrc, setIframeSrc] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('https://api.github.com/users/coen-h/repos');
            const data = await response.json();
            setItems(data);
        };

        const fetchSpotify = async () => {
            const response = await fetch('https://api.github.com/repos/coen-h/spotify/contents/player.min.html');
            const data = await response.json();
            setIframeSrc("data:text/html;charset=utf-8;base64," + encodeURIComponent(data.content));
        };

        fetchItems();
        fetchSpotify();
    }, []);

    return (
        <div id="site">
            <div id="card-top" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <p style={{fontSize: "2rem", textDecoration: "underline"}}>Welcome</p>
                <button id="exit-button" onClick={stopSite}>X</button>
            </div>
            <div id="card-middle" style={{display: "flex", justifyContent: "center", gap: "20px"}}>
                <div id="user">
                    <p style={{fontSize: "1.5rem"}}>Hi, My names Coen.</p>
                    <pre style={{fontSize: "1.5vh"}}>{generateGlobe()}</pre>
                    <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                        <p>Auckland, New Zealand</p>
                        <p style={{fontSize: "0.75rem"}}>"Worry never robs tomorrow of its sorrow, it only saps today of its joy."</p>
                    </div>
                </div>
                <div>
                    <iframe style={{border: "0", width: "420px", height: "151px", borderRadius: "16px", marginBottom: "5px"}} src={iframeSrc}></iframe>
                    <div id="github-container">
                        <div id="github-content" style={{display: "flex", flexDirection: "column-reverse", gap: "20px"}}>
                            {items.map((item) => (
                                <a id="github-card" key={item.name} href={item.html_url}>
                                    <div style={{textAlign: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.2)"}}>
                                        <p style={{fontSize: "1.3rem"}}>{item.name}</p>
                                        <p>{item.description || 'No description provided'}</p>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <p>{item.stargazers_count} Stars</p>
                                        <p>{item.open_issues} Issues</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{textAlign: "center"}} id="projects">
                    <div>
                        <img style={{width: "30vh"}} src='/zmov.jpg' />
                        <div>
                            <p style={{fontSize: "1.5rem"}}>zmov</p>
                            <p style={{width: "300px"}}>My movie site made using React, Vite, and the TMDB API.</p>
                        </div>
                    </div>
                    <div>
                        <img style={{width: "30vh"}} src='/website.jpg' />
                        <div>
                            <p style={{fontSize: "1.5rem"}}>My Website</p>
                            <p style={{width: "300px"}}>The website you are on right now, now remade using React.</p>
                        </div>
                    </div>
                    <p style={{textDecoration: "underline", fontSize: "1.2rem"}}>MORE COMING SOON</p>
                </div>
            </div>
            <div id="card-bottom" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <p>work in progress :)</p>
                <div>
                    <a href="mailto:me@coen.ovh">
                        <img style={{height: "32px"}} src="./assets/email.png" />
                    </a>
                    <a href="https://github.com/coen-h">
                        <img src="./assets/github-mark-white.png" />
                    </a>
                    <a href="https://discordapp.com/users/676659509711732737">
                        <img src="./assets/discord.jpg" />
                    </a>
                </div>
            </div>
        </div>
    )
}