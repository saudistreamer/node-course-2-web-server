const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log("Unable to append to server.log");
    }
  });
  next();
});

// app.use((req, res, next) =>{
//
//   return res.render('maintenance.hbs',{
//     pageTitle: 'Maintenance Page',
//     welcomeMessage: 'Please come back later.'
//   });
//
// });
app.use(express.static(__dirname+ '/public'));
hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
})

app.get('/', (req,res) => {
  //res.send('<h1>Hello Express!</h1>');
//   res.send({
// name: 'Saud',
// likes: [
//   'Gaming',
//   'Anime'
// ]
// });

  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to The most incrudble example in the world'
  })
});


app.get('/about', (req,res) => {
  //res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  })
});

app.get('/projects', (req,res) => {
  //res.send('About Page');
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    Message: 'Protfolio page here'
  })
});

app.get('/bad', (req, res) => {

res.send({
  errorMessage: 'Page was not found 404 ^__*',

})
});


app.listen(port, () =>{
  console.log(`Server is up on port ${port}.`);
});
