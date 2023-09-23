//jshint esversion:6

const express = require('express');
const path = require('path');
const app = express();
const port = 4000
const db = require('./config/conection')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./mongodbSchema/schema')


const viewPath = path.join(__dirname , "./views")
console.log(viewPath)
const publicPath = path.join(__dirname , "./public")

app.use(express.json())
app.set("view engine" , "ejs")
app.set("views" , viewPath)
app.use(express.static(publicPath))
app.use(express.urlencoded({
    extended:true
}))

app.get('/' , function(req,res){
    res.render("home")
})
app.get('/register' , function(req,res){
    res.render("register")
})
app.get('/login' , function(req,res){
    res.render("login")
})


//post req
app.post('/register' , async(req ,res)=>{
    try{
        const newUser = await new User({
            email: req.body.username,
            password: req.body.password
        })
        
        const registerUser = await newUser.save()
        res.status(200).render('secrets')  
    }
    catch(err){
        console.log("error in registeration" , err)
    }
})
app.post('/login', async (req, res) => {
    try {
        const LoginUser = req.body.username;
        const LoginPassword = req.body.password;

        const validUser = await User.findOne({ email: LoginUser });
        const validPassword = await User.findOne({ password: LoginPassword });

        // User not found
        if (!validUser) {
            res.status(404).send("User not found. Please register.");
            return;
        }

        // Check if the password is correct
        

        if (validPassword) {
            res.status(200).render('secrets');
        } else {
            res.status(400).send('Invalid password. Please try again.');
        }
    } catch (error) {
        console.log("Error in login req: ", error);
    }
});

app.listen(port , ()=>{
    console.log(`server listen succsesfully listen at ${port}`)
})