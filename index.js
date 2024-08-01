  const  express = require("express");
  const app = express();
  const port = 8080;
  const path = require("path");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views")); // for viwes directory
app.use(express.static(path.join(__dirname,"public"))); // public dir can be accessed from outside
app.use(express.urlencoded({extended : true}));

const { v4:uuidv4 } = require('uuid'); // for creation of id 
const methodOverride = require("method-override");// this would help for using (PATCH AND DELETE) route
app.use(methodOverride("_method"));// override patch and delete 


let posts = [
    {

        id:uuidv4(),
        name: "POUSHALI Sikdar",
        content:" hey i an starting to learn about WEB DEV",
    },
    {
        id:uuidv4(),
        name: "Shradha Abhasti",
        content:" hey i an starting to learn about MERN STACK",
    },
    {
        id:uuidv4(),
        name: "PUJA SINGH",
        content:" hey i got selected in google",
    },
    {
        id:uuidv4(),
        name: "RAMESH MAJUMDER",
        content:" hey i an starting to learn about web dev",
    },
    {
        id:uuidv4(),
        name: "SHRIRUPA DAS",
        content:" i want to learn about MBA fee structure",
    },
];


app.listen(port, ()=>{
    console.log("your app is listen at 8080 port");
  });

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
});  

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let { name,content} = req.body;
    let id = uuidv4()
    posts.push({ id,name,content});
    res.redirect("/posts")
});

app.get("/posts/:id",(req,res)=>{
let {id} = req.params;
let post = posts.find((p)=> id === p.id);
res.render("show.ejs",{post});
});

app.get("/posts/:id/edit",(req,res)=>{
let {id} = req.params;
let post = posts.find((p)=> id === p.id);
res.render("edit.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
let {id} = req.params;
let newcontent = req.body.content;
let post = posts.find((p)=>id ===p.id);
post.content = newcontent;
res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
let {id} = req.params;
posts = posts.filter((p)=> id !== p.id);
res.redirect("/posts");


})