const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const httpRequest = require('request');
const bodyParser = require('body-parser');

const app = express();

//API Key - pk_96fa7121f3e2488a8fe48274d6c0876a

//set the port
const PORT = process.env.PORT || 6000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//call the API

function getStockDetails(cbFunction, ticker_name){
    httpRequest(`https://cloud.iexapis.com/stable/stock/${ticker_name}/quote?token=pk_96fa7121f3e2488a8fe48274d6c0876a`,
        {json: true}, (err, response, body) => {
            if(err){
                return console.log(err);
            }

            if(response.statusCode == 200){
                cbFunction(body);
            }

        });
}

//set the handlebars template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//Routes
//home route GET
app.get('/', (req, res) => {
    function getStockDetailsCallback(stockDetails){
        res.render('home', {
            stockDetails
        });
    }
    getStockDetails(getStockDetailsCallback, "fb");
    
});

//home route POST
app.post('/', (req, res) => {
    function getStockDetailsCallback(stockDetails){
        res.render('home', {
            stockDetails
        });
    }
    getStockDetails(getStockDetailsCallback, req.body.ticker_name);  
});

//about route
app.get('/about', (req, res) => {
    res.render('about');
});

//set the static folder
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));