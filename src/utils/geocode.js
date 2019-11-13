const request = require("request")

const geocode = (address, callback) => {
    const geoCodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaGFyaXN0YXVzZWVmIiwiYSI6ImNrMm9ibXlsdjB3aDIzbG54cWhiNDhsYmUifQ.8ItPsYITcH9sIGKfXjVXtA'
    request({url: geoCodeurl, json: true}, (error, response) => {
        if(error){
            callback("Unable to connect to location services", undefined)
        }else if(response.body.features.length === 0){
            callback("Unable to find location, try another search", undefined)
        }else{
            callback(undefined, {
             latitude: response.body.features[0].center[1],
             longitude: response.body.features[0].center[0],
             location: response.body.features[0].place_name
            })
        }
    })
 }

 module.exports = geocode