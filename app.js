const express = require("express");
const bodyParser = require("body-parser");
const mustache = require('mustache-express');
const app = express();
const port = process.env.PORT || 5000;

var todos = [

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
    res.render("index", { todos: todos });
});


app.post("/", function (req, res) {
    todos.push(req.body.todos);
    res.redirect('/');
})


app.listen(port, function () {
    console.log("Server is running on", port);
})