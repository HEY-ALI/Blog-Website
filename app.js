const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")
const app = express();
app.set("view engine",'ejs');
app.use(bodyparser.urlencoded({extended :true}));
app.use(express.static("public"));

var posts = [];

const homeStartingContent = "hii guys this is my home page"
const aboutcontent = "hii i am Arbab Ali Im a Software Engineer"
const contactcontent = "you can contact me at arbabali0006@gmail.com"
const nodata = " no match found ";



app.get("/", function(req, res){
  res.render('home',{homeStartingContent:homeStartingContent,
  posts :posts});
});


  app.get("/about", function(req, res){
    res.render('about',{aboutcontent:aboutcontent});});
  

    app.get("/contact", function(req, res){
      res.render('contact',{contactcontent:contactcontent});});
    
    app.get("/compose", function(req,res){
      res.render("compose");
    });

    app.post("/compose", function(req, res){
      const composedata = {titledata : req.body.title,
      postdata : req.body.post};
      posts.push(composedata);  
    res.redirect("/");
    });

    app.get("/post/:topic", function(req, res){
      const searchedtopic =_.lowerCase(req.params.topic);

      posts.forEach(function(cars){
       const storedtopic = _.lowerCase(cars.titledata);

       if(searchedtopic === storedtopic){
        res.render("post", {
          yourtopic : cars.titledata,
        topicdata: cars.postdata});
       }
    
      })
    
    });



app.listen(3000, function(){console.log("server started on port 3000");});

