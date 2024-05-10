const greetingElement = document.getElementById("greeting");

    function updateTimeGreeting() {
        const date = new Date();
        const hours = date.getHours();

        let greeting;
        if(hours >= 6 && hours <= 11){
            greeting ='Good Morning';
        }
        else if(hours >= 12 && hours <= 17){
            greeting = 'Good Afternoon';
        }
        else if(hours >= 18 && hours <= 21){
            greeting = 'Good Evening';
        }
        else if(hours >= 22 && hours <= 5){
            greeting = 'Good Night';
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