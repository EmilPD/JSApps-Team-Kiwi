let express = require('express'),
  bodyParser = require('body-parser'),
  lowdb = require('lowdb');

let db = lowdb('./data/data.json');
db._.mixin(require('underscore-db'));

let app = express();
app.use(bodyParser.json());

app.use(express.static('app'));
app.use('/libs', express.static('node_modules'));

require('./utils/authorize-user.js')(app, db);

//User routes
let usersController = require('./controllers/users-controller.js')(db);
app.put('/api/auth/login', usersController.put);
app.post('/api/auth/register', usersController.post);

// Categories routes
let categoriesController = require('./controllers/categories-controller.js')(db);
app.get('/api/categories/:categoryName', categoriesController.get);

// Ads routes
let classifiedsController = require('./controllers/classifieds-controller.js')(db);
app.get('/api/classifieds/count', classifiedsController.getCount);
app.get('/api/classifieds/:id', classifiedsController.get);
app.post('/api/classifieds/:category', classifiedsController.post);

app.listen(process.env.PORT || 80, function () {
    console.log("App is running on port: 80");
});