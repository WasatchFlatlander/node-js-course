const yargs = require('yargs');
const weather = require('./weather/weather');
const geocode = require('./geocode/geocode');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(`Error: ${errorMessage}`);
  } else {
    console.log(`Address: ${results.address}`);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weather) => {
      if (errorMessage) {
        console.log(`Error: ${errorMessage}`);
      } else {
        console.log(`Current Temp: ${weather.temperature} Feels Like: ${weather.apparentTemperature}`);
      }
    });
  }
});
