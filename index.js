const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connect = () =>{

    return mongoose.connect(
"mongodb+srv://monif:Finom1234@cluster0.gocvx.mongodb.net/test"
        );

};


const userSchema = new mongoose.Schema({
    firstName :{type : String, required:true},
lastName :{type : String, required:false},
email :{type : String, required:true,unique:true},
password :{type : String, required:true},
},
{
    timestamps:true,
});

const User = mongoose.model("user",userSchema);



const todoSchema = new mongoose.Schema({
    title :{type : String, required:true},
    userId : {type:mongoose.Schema.Types.ObjectId,
    ref : "user",
    required:true,
    }
},{
    timestamps:true,
});

const Todo = mongoose.model("todo",todoSchema);


// POST /register endpoint to create new users

app.post("/users", async (req,res) =>{
    try{
        const user = await User.create(req.body);
    }
    catch(e){
        return res.send(e);
    }
});

app.post("/todos", async (req,res) =>{
    try{
        const todo = await Todo.create(req.body);
    }
    catch(e){
        return res.send(e);
    }
});





app.listen(5000, async () =>{
    try{
        await connect();

    }
    catch(err){
        console.log("error",err);
    }
    console.log("listening on 5000");
});