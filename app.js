const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const config =require('./config/database');

//connect to database
mongoose. connect(config.database);

//on connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to database'+config.database);
});

//on error
mongoose.connection.on('error',(err)=>{
    console.log(' Database error'+err);
});

const app=express();

//define routes in diff file
const users=require('./routes/users');

//port no
const port=3000;

//Set Static folder

app.use(express.static(path.join(__dirname,'public')));

// Body  parser Middleware
app.use(bodyParser.json());

//Passport middleware

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//allow all domain access
app.use(cors())

//add route

app.get('/',(req,res)=>{
    res.send('Invalid end point');
})

//Every route must goto index.html

app.get("*",(req,res)=>
{
    res.sendFile(path.join(__dirname,'public/index.html'));
})


app.use('/users',users);

app.listen(port,()=>{
    console.log('Server started on port '+port);
});
