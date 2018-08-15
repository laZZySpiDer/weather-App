const request = require('request');



var getWeather = (lat, long, callback) => {
    
    request({
        url : `https://api.darksky.net/forecast/4e5f4193c9cf61a8151230d941fa7231/${lat},${long}`,
        json : true
    }, (error, response, body) =>{
        if(!error && response.statusCode === 200){
            callback(undefined,{
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature    
            });
        }else {
            callback('Unable to fetch the weather');
        }
    });
};


module.exports = {
    getWeather
}