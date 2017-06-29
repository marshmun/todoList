const express = require("express");
const bodyParser = require("body-parser");
const models = require('./models');
const mustache = require('mustache-express');
const app = express();
const port = process.env.PORT || 5000;

var mylist = [
    "become an amazing dog",
    "chase floating balloons",
    "eat all of the hamburgers"
]

app.use('/', express.static('./views'))

app.use(bodyParser.urlencoded({ extended: false }))


app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');


app.get("/", function (req, res) {
    models.todo.findAll().then(function (currentTodo) {
        // res.send(currentTodo);
        res.render("index", { todos: currentTodo });

    }).catch(function (err) {
        res.status(500).send(err);
    })
});


app.post("/", function (req, res) {
    var taskTitle = req.body.taskTitle;
    console.log('input: ', taskTitle);

    todos.push(req.body.taskTitle);
    // res.redirect('/');
    var newTodo = models.todo.build({ title: taskTitle });
    newTodo
        .save()
        .then(function (savedInput) {
            // res.send(savedInput)
            // redirecthome
            res.redirect('/')
        }).catch(function (err) {
            res.status(500).send(err);
        })
})

app.delete('/', function (req, res) {
    models.todo.destroy({ where: { id: req.params.id } })
        .then(function () {
            res.send("deleted User")
        })
        .catch(function (err) {
            res.status(500).send(err);
        })
})


app.listen(port, function () {
    console.log("Server is running on", port);
})