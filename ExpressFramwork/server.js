const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
app.set('view engine','hbs');
hbs.registerHelper('getname',()=>{
  return "sandeep"
});
hbs.registerPartials(__dirname + '/views/partial');
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {  
  console.log('%s %s', req.method, req.url); 
  var now=new Date().toString();
  var log=`${now}:${req.method} ${req.url}`;
   fs.appendFile('SearchingRecord.log',log+'\n',(err)=>{
     if(err){
       console.log(err);
     }
   } );
  next();  
});  
app.get('/home',(req,res,next)=>{
  res.render('home.hbs',{
    welcome:'Welcome to all guys.. have a nice day!..',
    title:'Home page',
    pageTitle:'home',
    currentYear:new Date().getFullYear(),
    currentDate:new Date().getDate()
});
});

app.get('/about',(req,res,next)=>{
  res.render('about.hbs',{
        welcome:'Welcome to all guys.. have a nice day!..',
        title:'Current knowledge gain',
        pageTitle:' Rajat',
        currentYear:new Date().getFullYear(),
        currentDate:new Date().getDate()
  });
});

app.get('/san',(req,res,next)=>{
    res.render('san.hbs',{
          welcome:' Welcome to all guys..',
          title:'General knowledge',
          pageTitle:' Surprise',
          currentYear:new Date().getUTCFullYear(),
          currentDate:new Date()
    });
  });


app.get('/bad',(req,res,next)=>{
  res.send({
    errorMessage:'Unable to response  your request'
  });
  
});

var server=app.listen(3000,()=>{
  console.log(`server is running in port 3000 `);
  var host = server.address().address;  
  var port = server.address().port;  
  console.log('Example app listening at http://%s:%s', host, port);  
});


