const express = require('express');
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser= require("cookie-parser");
const userModel = require(`./models/user`);
const eventModel = require(`./models/event`);
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

const isAuthenticated = (req, res, next)=>{
    let token = req.cookies.token;
    if(!token){
        return res.redirect("/login");
    }
    jwt.verify(token, 'shhhhh', function(err, decoded) {
        if(err){
            return res.redirect("/login");
        }
        req.user = decoded;
        next();
      });
}

app.get("/", (req, res)=>{
    res.render("index");
});
app.get("/homepage",isAuthenticated, async(req, res)=>{
    let events = await eventModel.find();
    res.render("events", {events});
})

app.get("/register", (req, res)=>{
    res.render("register");
})
app.post("/register", async(req, res)=>{
    let{username, email, password} = req.body;
    let user = await userModel.findOne({email});
    if(user){
        return res.send("user already exists");
    }

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            let user = await userModel.create({
                username,
                email,
                password: hash
            });
            let token = jwt.sign({ email }, 'shhhhh');
            res.cookie("token", token);

            res.redirect("/homepage");
        });
    });

})

app.get("/login", (req, res)=>{
    res.render("login");
})
app.post("/login", async (req, res)=>{
    let{email, password } = req.body;
    let user = await userModel.findOne({email});
    if(!user){
        return res.send("user doesnt exists!")
    }
    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
            let token = jwt.sign({ email }, 'shhhhh');
            res.cookie("token", token);
            
            res.redirect("/homepage");
        }else{
            res.send("password is incorrect");
        }
    });
})

app.get("/admin", isAuthenticated, (req, res)=>{
    res.render("createEvents");
});
app.post("/createEvent", isAuthenticated, async(req, res)=>{
    let {title, date, organisation, description, link} = req.body;

    let event = await eventModel.create({
        title,
        date,
        organisation,
        description,
        link
    })

    res.redirect("/admin");
})


app.listen(3000, ()=>{
    console.log("server is running");
});
