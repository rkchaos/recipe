
const {recipeSchema,reviewSchema}=require('./schema')
const validateRecipe=(req,res,next)=>{
    let{name,description,email,ingredient,image} = req.body;
const{error}=recipeSchema.validate({name,description,email,ingredient,image});
if(error){
    const msg=error.details.map((err)=>err.message).join(',')
    return res.render('error',{err:msg})

}
next();
}
const validateRating=(req,res,next)=>{
    let{rating,comment} = req.body;
const{error}=reviewSchema.validate({rating,comment});
if(error){
    const msg=error.details.map((err)=>err.message).join(',')
    return res.render('error',{err:msg})

}
next();
}
module.exports={validateRecipe,validateRating}
