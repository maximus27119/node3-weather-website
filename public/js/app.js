const form = document.querySelector('form');
const input =  document.querySelector('#addressInput');
const button = document.querySelector('#searchButton');
const message_1 = document.querySelector('#message-1');
const message_2 = document.querySelector('#message-2');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    message_1.textContent = "Loading...";
    message_2.textContent = "";

    const location = input.value;

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then( (data) => {
            if(data.error){
                return message_1.textContent = data.error;
            }

            message_1.textContent = data.location;
            message_2.textContent = data.summary + ' Сейчас на улице ' + data.temperature + ' C°, шанс дождя: ' + data.chanceOfRain + '%';
        });
    });
});