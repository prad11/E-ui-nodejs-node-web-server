const express= require('express');
const hbs=require('hbs');


const fs=require('fs');

var app= express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');



app.use((req,res,next)=>{
   var now = new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n',(err)=>{
        if(err){
            console.log('unable to append to server.log')
        }
    });
    next();
});

/*app.use((req,res,next)=>{
 //  res.render('maintenance.hbs'); 
});*/
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentyear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase()
    
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page',
     
       someText:'Welcome to about'});
});
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home page',
        
       someText:'Welcome'
    });
});
app.get('/bad',(req,res)=>{
    res.send({
             errormessage:'unable to handle req'
             });
});
app.listen(3000,()=>{
    console.log('server is up');
});