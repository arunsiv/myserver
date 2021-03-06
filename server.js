const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to access server.log file');
        }
    });

    next();
});
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('upperCaseText', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageHeading: 'Home',
        welcomeMessage: 'Welcome to my home page',
    });
});

app.get('/aboutme', (req, res) => {
    res.render('aboutme.hbs', {
        pageHeading: 'About Me',
    });
});

app.listen(port, ()=> {
    console.log(`Web Server is listening on port ${port}...`);
});