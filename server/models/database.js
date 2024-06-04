
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rk0346101:rajkumarhero@cluster0.6oqutcr.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('connected')
})
.catch((err)=>{
    console.log(err)
})
require('./Category');
require('./Recipe');