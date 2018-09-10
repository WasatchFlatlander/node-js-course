const request = require('request');

const getWeather = (lat, lng, callback) => {
  const requestUrl= `https://api.darksky.net/forecast/11b40d8fc8dbaa48f506919445d95916/${lat},${lng}`;
  request({
    url: requestUrl,
    json: true
  }, (error, response, body) => {
    if(!error && response.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable To Fetch Weather');
    }
  });
};

module.exports = {getWeather};
