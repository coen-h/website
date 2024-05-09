const greetingElement = document.getElementById("greeting");

    function updateTimeGreeting() {
        const date = new Date();
        const hours = date.getHours();

        let greeting;
        if(hours >= 6 && hours <= 11){
            greeting ='Good Morning!';
        }
        else if(hours >= 12 && hours <= 5){
            greeting = 'Good Afternoon!';
        }
        else if(hours >= 6 && hours <= 9){
            greeting = 'Good Evening!';
        }
        else if(hours >= 10 && hours <= 5){
            greeting = 'Good Night!';
        }
        else{
            greeting = 'time broke!!!'
        }

    greetingElement.textContent = greeting;
}

document.addEventListener("DOMContentLoaded", function() {
    updateTimeGreeting();
  });  

function toggleMode() {
    document.page.classList.toggle("light-theme");
}
const currentTheme = localStorage.getItem("theme");if (currentTheme == "light") {
    document.body.classList.add("light-theme");
    }function toggleMode() {
    document.body.classList.toggle("light-theme");
    let theme = "dark";
    if (document.body.classList.contains("light-theme")) {
    theme = "light";
    }
    localStorage.setItem("theme", theme);
}