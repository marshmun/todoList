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

app.use('/', express.static('./public'))

app.use(bodyParser.urlencoded({ extended: false }))


app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './views');


app.get("/", function (req, res) {
    models.todo.findAll().then(function (currentTodo) {
        res.render("index", { todos: currentTodo });

    }).catch(function (err) {
        res.status(500).send(err);
    })
});

app.get('/update/:idrs', (req, res) => {
    models.todo.findOne({ id: req.params.id })
        .then(singleTodo => {
            res.render('update', { updatethis: singleTodo })
        })
})



app.post('/update/:id', (req, res) => {
    models.todo.update({ title: req.body.title }, { where: { id: req.params.id } })
        .then(updatedtodo => {
            res.redirect('/')
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

app.post("/", function (req, res) {
    var taskTitle = req.body.taskTitle;
    var newTodo = models.todo.build({ title: taskTitle });
    newTodo
        .save()
        .then(function (savedInput) {
            res.redirect('/')
        }).catch(function (err) {
            res.status(500).send(err);
        })
})

app.post("/delete-post", (req, res) => {
    models.todo.destroy({ where: { id: req.body.id } }).then(() => {
        return res.redirect('/')
    }).catch(err => {
        res.send('error')
    })
});


app.listen(port, function () {
    console.log("Server is running on", port);
})