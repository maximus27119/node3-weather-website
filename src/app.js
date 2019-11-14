const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const dataModule = require('./utils/dataModule');
const getDate = require('./utils/getDate');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "Maxim Usyk"
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        name: "Maxim Usyk"
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Error",
        message: "Help article not found",
        name: "Maxim Usyk"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About page",
        name: "Maxim Usyk"
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        });
    }

    console.log(req.query.search);
    res.send({
        products: [req.query.search]
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address!"
        });
    }

    let date = getDate();
    if(dataModule.isDataExists('./data/' + date)){// Проверка, существует ли папка с датой
        if(dataModule.isDataExists('./data/' + date + '/' + req.query.address)){ // Проверка на папку с городом
            if(dataModule.isDataExists('./data/' + date + '/' + req.query.address + '/' + req.query.address + '.json')){ // Проверка на файл
                let dataFromJson = JSON.parse(dataModule.loadData('./data/' + date + '/' + req.query.address + '/' + req.query.address + '.json'));
                return res.send(dataFromJson);
            }
        }
    }else{
        dataModule.createDirectory('./data/' + date + '/');
    }

    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error });
        }
        
        forecast(latitude, longitude, (error, response) => {
            if(error){
                return res.send({ error });
            }
            response.location = location;
            dataModule.createDirectory('./data/' + date + '/' + req.query.address + '/');
            dataModule.saveData('./data/' + date + '/' + req.query.address + '/' + req.query.address + '.json', JSON.stringify(response));
            res.send(response);
        });
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "Error",
        message: "404. Page not found",
        name: "Maxim Usyk"
    })
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
