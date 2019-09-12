const request = require('request');

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoibWF4aW11czI3MTE5IiwiYSI6ImNqenBndXkydzBjM2czYm56YnNqaG9nY3oifQ.j4jfREzmjE_PEDebk2Hohw&limit=1';

    request({ url, json: true}, (error, {body: responseBody}) => {
        if(error){
            callback('Unable to connect to location services.', undefined);
            console.log("");
        }else if(responseBody.features.length === 0){
            callback('Unable to find the current location. Try another place.', undefined);
        }else{
            callback(undefined, {
                latitude: responseBody.features[0].center[1],
                longitude: responseBody.features[0].center[0],
                location: responseBody.features[0].place_name
            });
        }
    });
};

module.exports = geocode;