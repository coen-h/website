import * as THREE from '//unpkg.com/three/build/three.module.js';

const greetingElement = document.getElementById("greeting");

    function updateTimeGreeting() {
        const date = new Date();
        const hours = date.getHours();

        let greeting;
        if(hours >= 6 && hours <= 11){
            greeting ='Morning!';
        }
        else if(hours >= 12 && hours <= 17){
            greeting = 'Having a good day?';
        }
        else if(hours >= 18 && hours <= 21){
            greeting = 'Hey there!';
        }
        else if(hours >= 22 && hours <= 5){
            greeting = 'Good night!';
        }
        else{
            greeting = 'Hello!'
        }

    greetingElement.textContent = greeting;
    setInterval(updateTimeGreeting, 60000);
}

document.addEventListener("DOMContentLoaded", function() {
    updateTimeGreeting();
  });  

  const username = 'coen-h';
  const githubDiv = document.getElementById('github');

  fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => {
          data.forEach(repo => {
              const repoItem = document.createElement('div');
              repoItem.classList.add('repo-item');
              repoItem.innerHTML = `
              <a id="github-box" href="${repo.html_url}" target="_blank">
              <div class="repo-info">
                  <p style="font-weight: bold">${repo.name}</p>
                  <p>${repo.description || 'No description provided'}</p>
              </div>
              <div class="repo-meta">
                  <p>${repo.stargazers_count} <img id="star-icon" src="./assets/star.png"></p>
                  <p>${repo.open_issues} Issues</p>
              </div>
              </a>
              `;
              githubDiv.appendChild(repoItem);
          });
      })
      .catch(error => {
          console.error('Error fetching repositories:', error);
      });


const globeVizDiv = document.getElementById('globeViz');

const world = Globe()
    .backgroundColor('rgba(0,0,0,0)')
    .pointOfView({ lat: -40.9006, lng: 174.8860, altitude: 0 })
    .showGlobe(false)
    .showAtmosphere(false)
    .height(430);

world(globeVizDiv);

world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 4;

world.htmlElementsData([
    { lat: -36.8509, lng: 174.7645 }
])
.htmlElement(d => {
    const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
    </svg>`;
      
    const el = document.createElement('div');
    el.innerHTML = markerSvg;
    el.style.color = 'red';
    el.style.width = '5px';

    el.style['pointer-events'] = 'auto';
    el.style.cursor = 'pointer';
    el.onclick = () => console.info(d);
    return el;
});

fetch('./assets/land-110m.json').then(res => res.json())
.then(landTopo => {
    world
    .polygonsData(topojson.feature(landTopo, landTopo.objects.land).features)
    .polygonCapMaterial(new THREE.MeshLambertMaterial({ color: 'darkslategrey', side: THREE.DoubleSide }))
    .polygonSideColor(() => 'rgba(0,0,0,0)');
});