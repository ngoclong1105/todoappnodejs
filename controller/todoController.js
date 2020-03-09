var bodyParser = require("body-parser");
var db = require('mongoose')

db.connect('mongodb+srv://admin:admin@todoapp-zhucs.mongodb.net/test?retryWrites=true&w=majority')
var urlencodedParser = bodyParser.urlencoded({encoded: false});

var todoSchema = new db.Schema({
    item:String,
});
var Todo = db.model('Todo',todoSchema);

module.exports = function(app){
    // get data from mongo to view
    app.get('/todo',function(req,res){
        Todo.find({},function(err,data){
            if (err) throw err;
            res.render('todo',{todos:data})
        })
    });
    app.post('/todo',urlencodedParser,function(req,res){
        var newTodo= Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        })

    });
    app.delete('/todo/:item',function(req,res){
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data) {
            if (err) throw err;
            res.json(data);
        })
    });

};
