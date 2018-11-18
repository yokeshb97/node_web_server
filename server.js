const express = require('express');
const hbs = require('hbs');
const fs= require('fs');

const port=process.env.PORT || 3000;

var app=express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`
  fs.appendFile('server.log',log + '\n' ,(err)=>{
    if(err)
      console.log("Unable to append to log file");
  });
  console.log(log);
  next();
});

/*app.use((req,res,next)=>{
  res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));


app.get('/',(req,res)=>{
  res.render('home.hbs',{

    pageTitle:'Home page',
    welcomeMessage:'Welcome ABC'
  })
});

app.get('/project',(req,res)=>{
  res.render('project.hbs',{

    pageTitle:'Project page',
    projectMessage:'Displays list of projects'
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'Hello'

  })
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to connect'
  });
});


app.listen(port);
