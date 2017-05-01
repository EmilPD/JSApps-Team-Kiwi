let express = require('express'),
  bodyParser = require('body-parser'),
  lowdb = require('lowdb');

let db = lowdb('./data/data.json');
db._.mixin(require('underscore-db'));

let app = express();
app.use(bodyParser.json());

app.use(express.static('app'));
app.use('/libs', express.static('node_modules'));

// Categories
let categoriesController = require('./controllers/categories-controller.js')(db);
app.get('/api/categories/:id', categoriesController.get);

app.listen(process.env.PORT || 80, function () {
    console.log("App is running on port: 80");
});