let ingredientList=document.querySelector('.ingredientList')
let addIngredientsBtn=document.querySelector("#addIngredientsBtn")
let div=document.querySelector('.ingredeintDiv');


addIngredientsBtn.addEventListener('click',()=>{
let input=document.createElement('input'); 
input.setAttribute("type","text");
input.classList.add('form-control');
ingredientList.appendChild(input)
})
