const yargs = require('yargs');
const axios = require('axios');

//https://api.darksky.net/forecast/11b40d8fc8dbaa48f506919445d95916/37.8267,-122.4233
//api key11b40d8fc8dbaa48f506919445d95916

const argv = yargs
  .options({
    a: {
      describe: 'Address to fetch weather for',
      demand: true,
      alias: 'address',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl)
  .then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
      throw new Error('Unable to find address.');
    }
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const weatherUrl = `https://api.darksky.net/forecast/11b40d8fc8dbaa48f506919445d95916/${lat},${lng}`;
    return axios.get(weatherUrl);
  })
  .then((response) => {
    const temp = response.data.currently.temperature;
    const apparentTemp = response.data.currently.apparentTemperature;
    console.log(`Current Temp: ${temp} Feels Like: ${apparentTemp}`);
  })
  .catch((error) => {
    if(error.code === 'ENOTFOUND'){
      console.log('Unable to connect to API servers')
    } else {
      console.log(error);
    }
  });
