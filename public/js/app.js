const form = document.querySelector('form');
const input =  document.querySelector('#addressInput');
const button = document.querySelector('#searchButton');
const useLocationButton = document.querySelector('#useLocationButton');
const message_1 = document.querySelector('#message-1');
const message_2 = document.querySelector('#message-2');
const message_3 = document.querySelector('#message-3');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    message_1.textContent = "Loading...";
    message_2.textContent = "";
    message_3.textContent = "";

    const location = input.value;

    fetch('/weather?address=' + location).then((response) => {
        response.json().then( (data) => {
            if(data.error){
                return message_1.textContent = data.error;
            }

            message_1.textContent = data.location;
            message_2.textContent = data.summary + ' Сейчас на улице ' + data.temperature + ' C°, шанс дождя: ' + data.chanceOfRain + '%';
            message_3.textContent = 'Максимальная температура днём: ' + data.temperatureMax + ' C°, минимальная ночью: ' + data.temperatureMin + 'C°.';
        });
    });
});

// useLocationButton.addEventListener('click', () => {
//     if(!navigator.geolocation)
//         return alert("Geolocation is not supported by your browser");
    
//     // useLocationButton.setAttribute('disabled','disabled');

//     message_1.textContent = "Loading...";
//     message_2.textContent = "";
//     message_3.textContent = "";

//     const location = input.value;

//     fetch('/weather?address=' + location).then((response) => {
//         response.json().then( (data) => {
//             if(data.error){
//                 return message_1.textContent = data.error;
//             }

//             message_1.textContent = data.location;
//             message_2.textContent = data.summary + ' Сейчас на улице ' + data.temperature + ' C°, шанс дождя: ' + data.chanceOfRain + '%';
//             message_3.textContent = 'Максимальная температура днём: ' + data.temperatureMax + ' C°, минимальная ночью: ' + data.temperatureMin + 'C°.';
//         });
//     });

//     navigator.geolocation.getCurrentPosition((position) => {
//         socket.emit('sendLocation', {
//             longitude: position.coords.longitude,
//             latitude: position.coords.latitude
//         }, () => {
//             useLocationButton.removeAttribute('disabled');
//             console.log('Location shared');
//         });
//     });

// });
