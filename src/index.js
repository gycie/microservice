const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const models = require('../models');

app.get("/", (req,res)=>{
    res.send("Bienvenue dans le microservice");
});

app.post("/Adduser",(req,res)=>{
    var newUser ={
        nom:req.body.nom,
        prenom:req.body.prenom,
        email:req.body.email,
    };

    models.User.create(newUser).then( result =>{
        res.status(200).json({
            message:"Enregistre",
            user:result
        })
    }).catch(error=>{
        res.status(500).json({
            message:"Il y a un probleme",
            error:error
        })
    });
});

app.get("/users",(req,res)=>{
    models.User.findAll().then( result =>{
        res.status(200).json(result)
    }).catch(error=>{
        res.status(500).json({
            message:"Il y a un probleme",
            error:error
        })
    });
    
});


app.listen(3000, () => {
    console.log("listening on port 3000");
  });