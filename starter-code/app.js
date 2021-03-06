const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => {
    res.render('index')
});

app.get('/beers', async (req, res) =>{
   try{
        const beers = await punkAPI.getBeers()
        res.render('beers',{beers})
   }catch(error){
        console.log(error)
        res.send(error)
   }
});

app.get('/beers/:id/details', async (req, res) =>{
     try{
          const beer = await punkAPI.getBeers(req.params.id)
          res.render('random-beer',{beer})
     }catch(error){
          console.log(error)
          res.send(error)
     }
  });

app.get('/random-beer', async (req, res) => {
    try{
        const randomBeer = await punkAPI.getRandom()
        res.render('random-beer',{randomBeer})
   }catch(error){
        console.log(error)
        res.status(400).send(error)
   }
});

app.listen(5003 , () => console.log('🏃‍ on port 5003'));
