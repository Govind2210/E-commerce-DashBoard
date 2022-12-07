const express = require("express")

const cors = require("cors")
require("./db/config")

const User = require("./db/User")
const products  = require("./db/products")

const jwt = require('jsonwebtoken')
const jwtKey = 'e-comm'

const app =  express()
const PORT = process.env.PORT || 8080

// middle ware
app.use(express.json())
app.use(cors())



// post api for register
app.post("/register" , async (req ,res) =>{
    let user =  new User(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    jwt.sign({result} , jwtKey , {expiresIn : '2h' } , (err , token) => {
        if(err){
            res.send("somrhting went wrong")
        }

        res.send({result , auth : token})

    })
})

// login api
app.post("/login" , async(req , res)=>{
    let user = await User.findOne(req.body).select("-password")
   if(req.body.password && req.body.email){
        if(user){
            jwt.sign({user} , jwtKey , {expiresIn : '2h'} , (err ,token) =>{
                if(err){
                    res.send("something went wrong")
                }
                res.send({user , auth : token})
            })
        }
        else{
            res.send({result : "not a user"})
        }
   }else{
        res.send({result : "not a user"})
   }
   
})

// post api for products
app.post("/addProduct" , async (req ,res)=>{

    let product = new products(req.body)
    let result = await product.save()
    res.send(result)

})

//product list api
app.get("/products"  , async (req ,res)=>{

    const product = await products.find();
    
    if(product.length > 0){
        res.send(product)
    }
    else{
        res.send({result : "No Product Found"})
    }
})

// delete api
app.delete("/products/:id" , async(req , res)=>{
    let result = await products.findByIdAndRemove({_id:req.params.id})
    res.send(result)

})

// api for single product
app.get("/products/:id"  , async (req ,res)=>{
    let result = await products.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }
    else{
        res.send({"result" : "No result found"})
    }
})

// put method to update the data 
app.put("/products/:id" , async (req ,res)=>{
    let result = await products.update(
        {_id:req.params.id} ,
         { $set:req.body }
        )
    res.send(result)
})

// search api 
app.get("/search/:key"  , async (req ,res) =>{
    let result = await products.find({
        "$or":[
            {
                name:{$regex: req.params.key}
            },
            {
                company:{$regex: req.params.key}
            },
            {
                Category:{$regex: req.params.key}
            }
        ]
    });
    res.send(result);
})
 
function verifyToken(req ,res ,next){
    console.log(req.headers['authorization']);
    let token = req.headers['authorization']
    if(token){
        token =token.split(' ')[1];
        jwt.verify(token , jwtKey , (err , valid)=>{
            if(err){
                res.send({result:'please provide a valid token'})
            }
            else{
                next()
            }
        })
    }else{
        res.send({result:'please provide a token'})
    }
    next();
}


app.listen(PORT, ()=>{console.log(`this is working on ${PORT}`)})