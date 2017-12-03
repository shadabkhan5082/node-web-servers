const express=require('express');
const hbs= require('hbs');
const fs= require('fs');

const port= process.env.PORT || 3000;
const app= express();

app.set('view source', 'hbs');

hbs.registerPartials(__dirname+'/views/partials');




app.use((req,res,next)=>{
  var now= new Date().toString();
  var a=`${now}:${req.method} ${req.path}`;
  //console.log(a);
  fs.appendFileSync('server.log',a+'\n');

 next();
});

// app.use((req,res)=>{
//   res.render('maintenence.hbs')
// });

app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: "Welcome to my website",
    currentYear: new Date().getFullYear()
  })
});

app.get('/bad', (req,res)=>{
  res.send({
    Error:'this is an error'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});


app.listen(port,()=>{
  console.log(`server is running on :${port} `)
});
