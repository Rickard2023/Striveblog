import { Router } from "express";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import cloudinaryMiddleware from "../middlewares/multer.js";
import cloudinaryMiddlewareCovers from "../middlewares/multerCover.js";

// Creiamo un nuovo Router e esportiamolo per essere utilizzato altrove
export const commentRoute = Router();

// create new comment on a post
commentRoute.post("/:postID/:userID", async (req, res, next) => {
    try {
        // Creiamo un nuovo documento utente, con i valori presi dal body della richiesta
        let commentedPost = await Post.findById(req.params.postID);
        if(!commentedPost) 
            return;

        let user = await User.findById(req.params.userID);
        if(!user)
            return;

        let userComment = await Comment.create(req.body);
        userComment.user = user._id;
        userComment.post = req.params.postID;
        // Mandiamo in risposta l'utente creato e un status code di 400 (successo)
        res.send(userComment).status(400);
    } catch (err) {
        // In caso di errore, procediamo
        next(err);
    }
});

// get all comments from a post
commentRoute.get("/:postID", async (req, res, next) => {
    try {

      let post = await Post.findById(req.params.postID);
      if(!post)
        return;

     let allComments = await Comment.find();
     let postComment = [];
     for(let userComment of allComments){
        if(userComment.post == req.params.postID){
            postComment.push(userComment);
        }
     }

      res.send(postComment);
    } catch (err) {
      next(err);
    }
});

// modify comment
commentRoute.put("/:commentID",async (req, res, next) => {
    try {
        let comment = await Comment.findByIdAndUpdate(req.params.commentID, req.body, {
          new: true,
        })

        res.send(comment)
      } catch (error) {
        next(error)
      }
});

// delete all comments on a post
commentRoute.delete("/all/:postID", async (req, res, next) => {
    try {
      await Comment.deleteMany({
        post: req.params.postID
      });
      res.send("I commenti del post sono stati eliminati correttamente").status(204);
    } catch (err) {
      next(err);
    }
  });

  // delete a specific comment from a post
commentRoute.delete("/:commentID", async (req, res, next) => {
    try {
      await Comment.deleteOne({
        _id: req.params.commentID
      });
      res.send("Il commento è stato cancellato correttamente").status(204);
    } catch (err) {
      next(err);
    }
  });

export default commentRoute;

