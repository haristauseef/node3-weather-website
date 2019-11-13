const express = require('express')
const path = require('path')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forcast')

// setup paths express config
const publicDirPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")
const hbs = require('hbs')

// setup of handlebars engine for view and location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// setup for static directory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "haris"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "this is about page",
        name: "Haris",
        imgsrc: "./img/robot.pNg"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "this is some helpful text",
        title: "Help",
        name: "Haris"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "please enter location"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({forecast: forecastData, location, address: req.query.address})
        })
    })
   // res.send({forecast: "it will be raining", location: req.query.address})
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        nmae:"haris",
        errorMessage: "Help page not found"
        })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "haris",
        errorMessage: "Page not found"
    })
})


app.listen(3000, () => {
    console.log("Server is up and running on port 3000")
})