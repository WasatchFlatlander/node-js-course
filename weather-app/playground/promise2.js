const request = require('request');

const geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    const requestUrl = `${baseUrl}${encodeURIComponent(address)}`;
    request({
      url: requestUrl,
      json: true
    }, (error, response, body) => {
      if(error){
        reject('Unable to connect to Google Servers.');
      }else if(body.status === 'OK'){
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }else{
        reject(`${body.status}`);
      }
    });
  });
};

geocodeAddress('19146')
  .then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
  })
  .catch((error) => {
    console.log(error);
  });
