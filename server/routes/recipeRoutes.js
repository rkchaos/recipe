const express =require('express')
const router=express.Router();
const recipeController=require("../controllers/recipeController");
const review=require("../controllers/reviewsController");
const { validateRating, validateRecipe } = require('../../middleware');
const authController=require("../controllers/authController")

const passport = require('passport');
// const{validateRating}=require('./mddleware')
// const{validateRecipe}=require('./mddleware')
router.get('/',recipeController.homepage);
router.get('/categories',recipeController.exploreCategories);
router.get('/categories/:id',recipeController.byid);
router.get('/recipe/:id',recipeController.explorRecipe);
router.post('/search',recipeController.searchexplore);
router.get('/explore-latest',recipeController.explorlatest);
router.get('/explore-random',recipeController.explorerandom);
router.get('/submit-recipe',recipeController.submitRecipe);
router.post('/submit-recipe',recipeController.submitRecipepost,validateRecipe);
router.post('/recipe/:id/rating',review.rate,validateRating)
router.get('/register',authController.sign)
router.post('/register',authController.signpost)
router.get('/login',authController.login)
router.post('/login',passport.authenticate('local', 
{ 
  failureRedirect: '/login', 
  failureMessage: true 
}),authController.loginpost)
router.get('/logout',authController.logOut)
  







module.exports=router; 