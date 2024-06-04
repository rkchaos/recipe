const express=require('express')
const User = require('../models/User')




exports.sign=async (req,res)=>{
    res.render('signup')
}
exports.signpost=async(req,res)=>{
 try{
    let{username,email,password,gender}=req.body
    let user=new User({username,email,gender});
    let newUser=await User.register(user,password)
    req.flash('success' , 'Created sucessfully')
    res.redirect('/')
     }
 catch(err){
req.flash('error','Username is already used ')
res.redirect('/register')
 }
    
}
exports.login=async(req,res)=>{
    res.render('login')
}


exports.loginpost=async (req, res)=> {
    req.flash('success' , 'Welcome Back')
    res.redirect('/');
};
exports.logOut=async(req,res)=>{
    req.logout(()=>{
        req.flash('success' , 'Logged out successfully')
        res.redirect('/login');
    });
}

