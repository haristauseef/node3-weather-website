const request = require("request");

//orignal url string
//const url = "https://api.darksky.net/forecast/d197b82cdaa51d5203d7ea1eb6a6ce9f/37.8267,-122.4233"

const forcast = (lat, long, callback) => {
    const forcastUrl = "https://api.darksky.net/forecast/d197b82cdaa51d5203d7ea1eb6a6ce9f/" + lat + "," + long
    request({url: forcastUrl, json: true}, (error, response) => {
        if(error){
            callback("unable to connect to forcast", undefined )
        }else if (response.body.error){
            callback("There was an error in response", undefined)
        }else{
            callback(undefined, response.body.daily.data[0].summary + " Currently it is " + response.body.currently.temperature + " degrees and it is " + response.body.currently.precipProbability + "% of rain")
        }
    })
}

module.exports = forcast