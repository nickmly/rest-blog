var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// Connect to mongoDB database
mongoose.connect("mongodb://localhost/rest_blog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Set up mongo schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

/////////////////////////////////////
// ROUTES
/////////////////////////////////////


app.get("/", function (req, res) {
    res.redirect("/blogs");
});

// INDEX
app.get("/blogs", function (req, res) {
    // Get all blogs from DB
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("Error: " + err);
        } else {
            res.render("index", { blogs: blogs });
        }
    });
});

// NEW
app.get("/blogs/new", function (req, res) {
    res.render("new");
});


// CREATE
app.post("/blogs", function (req, res) {
    // Get blog object from post request and add to database
    Blog.create(req.body.blog, function (err, blog) {
        if (err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW
app.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", { blog: foundBlog });
        }
    });
});

// EDIT
app.get("/blogs/:id/edit", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", { blog: foundBlog });
        }
    });
});

// UPDATE
app.put("/blogs/:id", function(req,res){
    
});
/////////////////////////////////////
/////////////////////////////////////


app.listen(3000, process.env.IP, function () {
    console.log("Server started");
});



