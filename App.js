const express = require('express');
const mongoose = require('mongoose');
const PORT = 8899;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');
//DB connection
const db= "mongodb://localhost:27017/mongocrud";
const connectDB = async()=>{
    try{
        await mongoose.connect(db, {useNewUrlParser:true});
        console.log("MongoDB connected");
    }
    catch(err){
        console.log(err.message);
    }
}
connectDB();
//End
const catModel = require('./db/categorySchema');

//routes
app.get('/',(req, res)=>{
    catModel.find({}, (err, data)=>{
        if(err) throw err;
        res.render('home',{data})
    })
})
app.get('/insert',(req, res)=>{
    res.render('form');
})
app.post("/insertcategory",(req, res)=>{
    let cname = req.body.cname;
    let path = req.body.path;
    // res.send(req.body)
    if(cname.length>4){
    let ins = new catModel({cname:cname, image:path});
    ins.save((err)=>{
        if(err) {res.send("Already added")}
        res.redirect('/');
    })
}else{
    res.send("Enter category correctly")
}
})

app.get("/delcategory/:id",(req, res)=>{
    let id = req.params.id;a
    catModel.deleteOne({_id:id}, (err)=>{
        if(err) throw err;
        res.redirect('/')
    })
})
app.get('/getcategory/:id', (req, res)=>{
    let id = req.params.id;
    catModel.find({_id:id}, (err,data)=>{
        if(err) throw err;
        res.render('update',{data:data[0]});
    })
})
app.post('/updatecategory/:id', (req, res)=>{
    let id = req.params.id;
    let cname = req.body.cname;
    let path = req.body.path;
    catModel.updateOne({_id:id},{$set:{cname:cname, image:path}}, (err)=>{
        if(err) throw err;
        res.redirect('/')
    })
})
app.listen(PORT, (err)=>{
    if(err) throw err;
    console.log(`Working on ${PORT}`);
})