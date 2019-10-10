const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

//set the port
const PORT = process.env.PORT || 6000;

//set the handlebars template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//Routes
app.get('/', (req, res) => {
    res.render('home');
});

//set the static folder
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));