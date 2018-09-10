const request = require('request');

function geocodeAddress(address, callback){
  const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  const requestUrl = `${baseUrl}${encodeURIComponent(address)}`;
  request({
    url: requestUrl,
    json: true
  }, (error, response, body) => {
    if(error){
      callback('Unable to connect to Google Servers.');
    }else if(body.status === 'OK'){
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }else{
      callback(`${body.status}`);
    }
  });
}

module.exports = {geocodeAddress};
