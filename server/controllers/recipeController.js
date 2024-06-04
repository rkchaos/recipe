const Category = require("../models/Category");
const Recipe=require('../models/Recipe');

require("../models/database")
// GET / home page
exports.homepage=async(req,res)=>{
    try{
        let limitNUmber=5;
        const categories=await Category.find({}).limit(limitNUmber)
       let newlimits=6;
        const latest=await Recipe.find({}).sort({_id:-1}).limit(newlimits)
        // res.render('index',{latest});
        const india=await Recipe.find({category:"Indian"}).limit(limitNUmber)
        res.render('index',{categories,latest,india});
    }
    catch(err){
console.log(err+"error ocured");
    }
  

}
// get categories
exports.exploreCategories=async(req,res)=>{
    try{
        let limitNUmber=20;
        const categories=await Category.find({}).limit(limitNUmber)
        res.render('categories',{categories,title:"categories"});
    }
    catch(err){
console.log(err+"error ocured");
    }
  
}
exports.explorRecipe=async(req,res)=>{
    try{
    let{id}=req.params;
    let recipe=await Recipe.findById(id).populate('reviews');
    res.render('recipe',{recipe,title:"explore recipe"})
        
    }
    catch(err){
console.log(err+"error ocured");
    }
  
}

exports.byid=async(req,res)=>{
try{
    let {id}=req.params;
    const limitNUmber =20;
const find=await Recipe.find({'category':id}).limit(limitNUmber);
res.render('categories',{find});
}
catch(e){
console.log(e);
}
}


exports.searchexplore=async(req,res)=>{

try{
    let{searchTerm}=req.body;
let recipe=await Recipe.find({$text:{$search : searchTerm,$diacriticSensitive:true}});
// res.json(recipe);
res.render("search",{recipe});
}
catch(e){
    console.log(e);
}
}

exports.explorlatest=async(req,res)=>{
    // let limitnumber=10;
  try{
    let latest=await Recipe.find({}).sort({_id:-1})
    res.render('explore-latest',{latest});
  }
  catch(e){
    console.log(e);
  }
}
exports.explorerandom=async(req,res)=>{
    try{
let count=await Recipe.find().countDocuments();
let random=Math.floor(Math.random()*count);
let recipe=await Recipe.findOne().skip(random)
res.render('random',{recipe});
    }
    catch(e){
        console.log(e)
    }
}

exports.submitRecipe=async(req,res)=>{
    res.render('submit-recipe')
}


exports.submitRecipepost=async(req,res)=>{
    try {

        let imageUploadFile;
        let uploadPath;
        let newImageName;
    
        if(!req.files || Object.keys(req.files).length === 0){
          console.log('No Files where uploaded.');
        } else {
    
          imageUploadFile = req.files.image;
          newImageName = Date.now() + imageUploadFile.name;
    
          uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
    
          imageUploadFile.mv(uploadPath, function(err){
            if(err) return res.satus(500).send(err);
          })
    
        }
    
        const newRecipe = new Recipe({
          name: req.body.name,
          description: req.body.description,
          email: req.body.email,
          ingredients: req.body.ingredients,
          category: req.body.category,
          image: newImageName
        });

await newRecipe.save();


    req.flash('success','Recipe has been submited')

res.redirect('/submit-recipe')
}

catch(error){
    req.flash('error','Recipe not added successfully')

res.redirect('/submit-recipe')
}

}












// async function  insertDymmyCategory(){

// try{
// await Category.insertMany([
//     {
//                 "name": "Thai",
//                 "image": "thai-food.jpg"
//               },
//               {
//                 "name": "American",
//                 "image": "american-food.jpg"
//               }, 
//               {
//                 "name": "Chinese",
//                 "image": "chinese-food.jpg"
//               },
//               {
//                 "name": "Mexican",
//                 "image": "mexican-food.jpg"
//               }, 
//               {
//                 "name": "Indian",
//                 "image": "indian-food.jpg"
//               },
//               {
//                 "name": "Spanish",
//                 "image": "spanish-food.jpg"
//               }
// ]);
// }
// catch(err){
// console.log("err"+err);
// }
// }
// insertDymmyCategory();





// async function insertDymmyRecipeData(){
//     try {
//       await Recipe.insertMany([
//         { 
//           "name": "Recipe Name Goes Here",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "American", 
//           "image": "southern-friend-chicken.jpg"
//         },
//         { 
//           "name": "Recipe Name Goes Here",
//           "description": `Recipe Description Goes Here`,
//           "email": "recipeemail@raddy.co.uk",
//           "ingredients": [
//             "1 level teaspoon baking powder",
//             "1 level teaspoon cayenne pepper",
//             "1 level teaspoon hot smoked paprika",
//           ],
//           "category": "American", 
//           "image": "southern-friend-chicken.jpg"
//         },
//       ]);
//     } catch (error) {
//       console.log('err', + error)
//     }
//   }
  
//   insertDymmyRecipeData();





