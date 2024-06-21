import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import methodOverride from 'method-override';

const app = express();
const port = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "apnacollege",
    content: "I Love coding!",
  },
  {
    id: uuidv4(),
    username: "kaushik",
    content: "Har Har Mahadev",
  },
  {
    id: uuidv4(),
    username: "Piyush",
    content: "Pandey",
  },
];
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
// add new Post
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");

  res.send(" Post sucessfully");
  // res.render("");
});
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);

  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post);
  console.log(id);
  res.redirect("/posts");
  res.send("pach request working");
});

app.get("/posts/:id/edit", (req,res)=>{
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", {post});
  
  res.send("working");
})

app.delete("/posts/:id",(req,res)=>{
  let {id}=req.params;
   posts=posts.filter((p)=> id !==p.id);
   
  res.send ("delete Sucess");
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
