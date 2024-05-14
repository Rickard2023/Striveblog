import { Router } from "express";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import cloudinaryMiddleware from "../middlewares/multer.js";
import cloudinaryMiddlewareCovers from "../middlewares/multerCover.js";
// Creiamo un nuovo Router e esportiamolo per essere utilizzato altrove
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {authMidd, generateJWT, verifyJWT} from "../auth/authenticate.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
export const userRoute = Router();


// create new user
userRoute.post("/", async (req, res, next) => {
    try {

        let user = await User.create(req.body);
        user.password = await bcrypt.hash(user.password,10);
        user.save();

        res.send(user).status(400);
    } catch (err) {

        next(err);
    }
});

// delete user
userRoute.delete("/:id", async (req, res, next) => {
    try {
      // Cerchiamo un documento utente usando una query specificia: deve avere l'id uguale a quello passato come parametro all'indirizzo
      await User.deleteOne({
        _id: req.params.id,
      });
      // Mandiamo un messaggio in risposta ed uno status code di 204
      res.send("L'utente è stato eliminato correttamente").status(204);
    } catch (err) {
      // In caso di errore, procediamo
      next(err);
    }
  });

// get users
userRoute.get("/", async (req, res, next) => { 

  if(verifyJWT())
    try {
      console.log(req.body);
      // Cerchiamo un documento utente con l'id uguale a quello passato come parametro
      let users = await User.find();
      // Mandiamo in risposta al client l'utente trovato
      res.send(users);
    } catch (err) {
      // In caso di errore, procediamo
      next(err);
    }
});

// get specific user
userRoute.get("/:userID", async (req, res, next) => {
    try {
      console.log(req.body);
      // Cerchiamo un documento utente con l'id uguale a quello passato come parametro
      let user = await User.findById(req.params.userID);
      // Mandiamo in risposta al client l'utente trovato
      res.send(user);
    } catch (err) {
      // In caso di errore, procediamo
      next(err);
    }
});

// get all user's posts
userRoute.get("/:userID/posts", async (req, res, next) => {
    try {
      console.log(req.body);
      // Cerchiamo un documento utente con l'id uguale a quello passato come parametro
      let allPosts = await Post.find();
      if(!allPosts)
        return;

      let userPosts = [];
     
      for(let singlePost of allPosts)
      {     
         if(singlePost.author == req.params.userID){
            userPosts.push(singlePost);
         }
      }

      console.log(userPosts);
      res.send(userPosts);
    } catch (err) {
      // In caso di errore, procediamo
      next(err);
    }
});

// add the password component to the user
userRoute.patch("/:userID/:par/:val", async(req,res,next) => {
  
    const id = req.params.userID;
    let user = await User.findById(id);
    if(!user) return res.status(404).send("user not found");
  
    try {
      const par = req.params.par;
      const val = req.params.val;
      user = await User.findByIdAndUpdate(id, {
          [par]: val
        },
        {new: true}
      )
      res.send(user);
    }
    catch(err){
      res.status(404).send(err);
    }
})  


// login
userRoute.post("/login", async ({ body }, res, next) => {

  const email = body.email;
  const password = body.password;
  try {
    let user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
      const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {
          expiresIn: "168h"
        }
      );
      user.token = token;
      console.log(user.token);
      user.save();
      const option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true
      };
      res.send(user);
      res.status(200).cookie("token", token, option).json({
        success: true,
        token,  
        user
      })
    }

  } catch (error) {

    next(error)
  }
})

userRoute.get("/me", authMidd, async (req, res, next) => {
  try {
    let user = await User.findById(req.user.id)

    res.send(user)
  } catch (error) {
    next(user)
  }
})

// modify a specific post
userRoute.put("/:userID", async (req, res, next) => {
  try {
    let user = await User.findByIdAndUpdate(req.params.userID, req.body, {
      new: true,
    })
    res.send(user)
  } catch (error) {
    next(error)
  }
});

export default userRoute;