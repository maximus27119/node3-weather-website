const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f72a873ea36c648b79a6db084c750d81/' + latitude + ',' + longitude + '?units=si&lang=ru';

    request({url: url, json: true}, (error, {body: responseBody}) => {
        if(error){
            callback('Unable to connect to weather service.', undefined);
        }else if(responseBody.error){
            callback('Cant find the current location', undefined);
        }else{
            callback(undefined, {
                summary: responseBody.daily.data[0].summary,
                temperature: responseBody.currently.temperature,
                chanceOfRain: responseBody.currently.precipProbability,
                temperatureMax: responseBody.daily.data[0].temperatureMax,
                temperatureMin: responseBody.daily.data[0].temperatureMin
            });
        }
    });
};

module.exports = forecast;