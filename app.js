var express = require('express');
var app = express();

app.use(express.static('app'));
app.use('/libs', express.static('node_modules'));

app.listen(process.env.PORT || 80, function () {
    console.log("App is running on port: 80");
});