import express  from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from "multer";
import register from "./models/register";
import blogData from "./models/blogdata";
import blogdata from "./models/blogdata";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.use(bodyParser.json())
app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'images')));

mongoose.connect('mongodb+srv://vasavi_08:NfjjB5FPcYmmT3pe@cluster0.yhpakpu.mongodb.net/DriveReady?retryWrites=true&w=majority')
.then(()=> app.listen(5002))
.then(()=>console.log("Connected to Database & Listening to localhost 5002"))
.catch((err)=>console.log(err));
app.post('/register',async(req,res,next)=>{
    console.log("Data in backend:",req.body)
    const {name,username,email,password} = req.body
    if(name=='' || username=='' || email=='' || password==''){
        return  res.send({msg:'fill all details'})
    }
    const registerData = new register({
        name,
        username,
        email,
        password
    })
    try{
        registerData.save()
    }
    catch(err){
        console.log(err)
    }
    
    return  res.send({"blogData":registerData,msg:'successfully registered'})
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/'); // Specify the destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Specify the image name
  },
});

const upload = multer({ storage: storage });

// Route for handling image upload
app.post('/newblog', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No image uploaded' });
  }

  const { title, category, des, state, by } = req.body;
  const image = req.file.path; // Save the image path

  // Validate other fields
  if (title === '' || category === '' || des === '' || image === '') {
    return res.status(400).json({ msg: 'Fill in all details' });
  }

  // Save data to MongoDB
  const BlogData = new blogData({
    title,
    category,
    des,
    state,
    by,
    image,
  });

  try {
    BlogData.save();
    console.log(image)
    return res.status(200).json({ msg: 'Blog created successfully', imagePath: image });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
});


app.post('/login', async (req,res,next) => {
    const { username, password } = req.body;
    try {
      const user = await register.findOne({ username:username });
  
      if(user){
        if(user.password === password){
          res.send({ msg:'success', id: user._id });
        } 
        else{
          res.send({ msg:'incorrect password' });
        }
      } 
      else {
        res.send({ msg:'not registered' });
      }
    } 
    catch (error) {
      res.status(500).send({ msg: 'server error' });
    }
  });
  

app.get('/getBlogData', async (req,res,next)=>{  
    let blogdata;
    try{
        blogdata = await blogData.find();
        if(!blogdata){
          return res.status(404).json({message:"Failed to get data"})
        }
        return res.status(200).json({blogdata})
    }
    catch(err){
        console.log(err)
    }
    
})

app.get('/getSearchData', async (req,res,next)=>{  
  let searchdata;
  const key = req.query.key;
  try {
    if (key) {
      searchdata = await blogData.find({ title:{ $regex: new RegExp(key, 'i') }});
    } 
    else {
      return res.status(200).json({ message: "title parameter is required for search." });
    }

    if (!searchdata) {
      return res.status(200).json({ message: "No matching data found" });
    }

    return res.status(200).json({ searchdata });
  } 
  catch (err) {
    console.log(err);
    
  }
  
})


app.get('/getCategory', async (req,res,next)=>{  
  let categoryData;
  const key = req.query.key;
  try {
    if (key) {
      categoryData= await blogData.find({ category:{ $regex: new RegExp(key, 'i') }});
    } 
    else {
      return res.status(200).json({ message: "title parameter is required for search." });
    }

    if (!categoryData) {
      return res.status(200).json({ message: "No matching data found" });
    }

    return res.status(200).json({ categoryData});
  } 
  catch (err) {
    console.log(err);
    
  }
  
})


app.get('/getuser/:id', (req, res, next) => {
  const _id = req.params.id;
    console.log(_id)
    register.findOne({"_id": _id}).then((user) =>{
    console.log("user",user,user.name)
    res.send({userName:user.name})
  })
});

app.get('/getuserblogs/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const user = await register.findOne({ "_id": _id });
    const userblogs = await blogData.find({ "by": user.name });
    const Name=user.name
    const artblogs = await blogData.find({ "category": 'Art', "by": user.name });
    const musicblogs = await blogData.find({ "category": 'Music', "by": user.name });
    const businessblogs = await blogData.find({ "category": 'Business', "by": user.name });
    const sportblogs = await blogData.find({ "category": 'Sports', "by": user.name });
    const educationblogs = await blogData.find({ "category": 'Education', "by": user.name });
    const cookingblogs = await blogData.find({ "category": 'Food', "by": user.name });
    return res.status(200).send({ userblogs, musicblogs ,businessblogs,sportblogs,artblogs,educationblogs,cookingblogs,Name});
  } 
  catch (error) {
    console.error("Error", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});



app.get('/getId', (req, res, next) => {
  const title = req.query.title;
  
  blogData.findOne({ "title": title }).then((user) => {
    if (!user) {
      return res.status(404).send({ msg: 'Blog not found' });
    }
    console.log(user._id)
    res.send({ id: user._id });
  }).catch((err) => {
    console.error(err);
    res.status(500).send({ msg: 'Internal Server Error' });
  });
});



app.put('/updateblog/:id', async (req, res, next) => {
  const id = req.params.id;
  const { title, category, des, state, by } = req.body;

  try {
    if (id) {
      const updateBlogData = await blogData.findByIdAndUpdate(id, { title, category, des, state, by }, { new: true });

      if (!updateBlogData) {
        return res.status(404).send({ msg: 'No matching document found' });
      }
      console.log(updateBlogData)
      return res.send(updateBlogData);
    } 
    else {
      return res.status(400).send({ msg: 'id is not present' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ msg: 'Internal Server Error' });
  }
});
