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
const statusElement = document.getElementById("status");

function updateTimeStatus() {
    const date = new Date();
    const hours = date.getHours();

    let statusText;
    let statusClass;

    if (hours >= 22 || hours <= 7) {
        statusText = 'Offline';
        statusClass = 'offline';
    } else {
        statusText = 'Online';
        statusClass = 'online';
    }

    const statusDot = document.querySelector('.status-dot');
    statusDot.textContent = ' ●';
    statusElement.className = statusClass;

    const statusTextElement = document.querySelector('.status-text');
    statusTextElement.textContent = statusText;
}

setInterval(updateTimeStatus, 60000);

document.addEventListener("DOMContentLoaded", function() {
    updateTimeGreeting();
    updateTimeStatus()
  });  

  const username = 'coen-h';
  const githubDiv = document.getElementById('github-content');

  fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => {
        data.reverse();
        
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
    .height(370);

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
fetch(
    "https://api.github.com/repos/coen-h/spotify/contents/player.min.html"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var iframe = document.getElementById("github-iframe");
      iframe.src =
        "data:text/html;charset=utf-8;base64," +
        encodeURIComponent(data["content"]);
});
let weather = {
    apiKey: "314701bcbbf912956449b9beb980d4a5",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const temp = data.main.temp.toFixed(1);
    const { humidity } = data.main;
    const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
    },
  };
  
  weather.fetchWeather("Auckland");  