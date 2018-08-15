const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const request = require('request');
const argv = yargs
    .options({
        a:{
            demand:true,
            alias: 'address',
            describe: 'Address to fetch weather for ',
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;

// // console.log(argv);
// // console.log(argv.a);




 geocode.geocodeAddress(argv.a, (errorMessage, results) => {
     if(errorMessage){
         console.log(errorMessage);
     }else{
         console.log(results.address);
         weather.getWeather(results.latitude,results.longitude, (errorMessage, weatherresults) => {
            if(errorMessage){
                console.log(errorMessage);
            }else{
                console.log(`It's currently ${weatherresults.temperature}. It feels like ${weatherresults.apparentTemperature}`);
            }
        });   
     }
 });