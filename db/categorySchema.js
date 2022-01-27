const mongoose=require('mongoose');
const catSchema=new mongoose.Schema({
    cname:{
        type:String,
        required:true,
        unique:true
    },
    image:{type:String,required:true},
    data:{type:Date,default:Date.now}
})
module.exports=mongoose.model("category",catSchema);