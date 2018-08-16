const yargs = require('yargs');
const axios = require('axios');
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

var encodedAddress = encodeURIComponent(argv.address);
var urlAddress = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(urlAddress).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find the address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var long = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/4e5f4193c9cf61a8151230d941fa7231/${lat},${long}`;    
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);

}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`The temperature is :${temperature}. It feels like : ${apparentTemperature}`);
}).
catch((e)=>{
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to Google API servers');
    }else{
        console.log(e.message);
    }
});
    // // console.log(argv);
// // console.log(argv.a);
// 



