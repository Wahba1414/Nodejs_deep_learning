var PORT = 9000;

var express = require('express');
var app = express();


var path = require('path');

var ejs = require('ejs');


var birds = require('./routes/birds');


// Note: here will ignore all other routes. 
// For 404 pages.
// app.use((req, res) => {
//   res.status(404).end('Route is not found');
// });

app.get('/', (req, res) => res.end('Hello Wahba'));

// serve static files.
app.use(express.static('public'));

// use modular Route module of Express.
app.use('/birds', birds);


// Define a template engine (ejs)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // to use absolute urls for more safe.

app.get('/template', function (req, res) {
  res.render('welcome.ejs', { yourdata: 'Hello from EJS Template' });
});


app.get('/error', () => {
  throw new Error('Broken!');
});

// Note: it should be the last route.
// For 404 pages.
app.use((req, res) => {
  res.status(404).end('Route is not found');
});


// comment it to use the default handler.
// Custom Error handler.
app.use((err, req, res, next) => {
  res.status(500).end('Something wrong happened');
});

app.listen(PORT, () => console.log(`Now server is running on port: ${PORT}`));