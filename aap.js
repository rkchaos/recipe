const express =require('express');
const app=express();
const expressLayouts= require("express-ejs-layouts")
const path=require('path')
const routes=require('./server/routes/recipeRoutes')
const fileUpload=require('express-fileupload')
const cookieParser=require('cookie-parser')
const session=require('express-session')
const flash = require('connect-flash');
const passport = require('passport');
const User=require("./server/models/User")
const LocalStrategy=require('passport-local')
// const { Session } = require('inspector');
const port=process.env.Port
require('dotenv').config();

app.use(flash());
app.set('views',path.join( __dirname,'views'));
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));
app.set( "view engine", "ejs"); 
app.use(cookieParser('CookingBlogSecure'))
let config={
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
}
app.use(session(config))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use((req,res,next)=>{
  res.locals.currentUser = req.user;
  res.locals.success=req.flash('success');
  res.locals.error=req.flash('error');
  next();
})
app.use(fileUpload())
app.use(expressLayouts)
app.use(routes)

app.set('layout','./layouts/main')



app.listen(port,()=>{
    console.log(`server connected to ${port}`)
})
