var express = require('express')

var app=express()

var todoController = require('./controller/todoController');

// setup template

app.set('view engine','ejs');

// static file
app.use(express.static('./public'));
// file controlller
todoController(app)


app.listen(8000);
console.log("Server running on the port 8000")