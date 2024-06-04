const express =require('express');
const Recipe = require('../models/Recipe');
const Review = require('../models/Review');


const router=express.Router();



exports.rate=async(req,res)=>{
let{rating,comment}=req.body;
let{id}=req.params;
let product=await Recipe.findById(id);
let review=new Review({rating,comment});
product.reviews.push(review)
await product.save()
await review.save()
res.redirect(`/recipe/${id}`)
}
