import { Router } from "express";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import cloudinaryMiddleware from "../middlewares/multer.js";
import cloudinaryMiddlewareCovers from "../middlewares/multerCover.js";

// Creiamo un nuovo Router e esportiamolo per essere utilizzato altrove
export const postRoute = Router();

// create new post
postRoute.post("/:userID", async (req, res, next) => {
    try {
        // Creiamo un nuovo documento utente, con i valori presi dal body della richiesta
        let user = await User.findById(req.params.userID);
        if(!user) 
          return res.send(user).status(404);

        let post = await Post.create(req.body);
        // Mandiamo in risposta l'utente creato e un status code di 400 (successo)
        res.send(post).status(404);
    } catch (err) {
        // In caso di errore, procediamo
        next(err);
    }
});

// delete user
postRoute.delete("/:id", async (req, res, next) => {
    try {
      // Cerchiamo un documento utente usando una query specificia: deve avere l'id uguale a quello passato come parametro all'indirizzo
      await Post.deleteOne({
        _id: req.params.id,
      });
      // Mandiamo un messaggio in risposta ed uno status code di 204
      res.send("Il post è stato eliminato correttamente").status(204);
    } catch (err) {
      // In caso di errore, procediamo
      next(err);
    }
  });

// get posts
postRoute.get("/", async (req, res, next) => {
    try {
      // Cerchiamo un documento utente con l'id uguale a quello passato come parametro
      let posts = await Post.find();
      // Mandiamo in risposta al client l'utente trovato
      res.send(posts);
    } catch (err) {
      // In caso di errore, procediamo
      next(err);
    }
});

// get specific post
postRoute.get("/:postID", async (req, res, next) => {
    try {
      // Cerchiamo un documento utente con l'id uguale a quello passato come parametro
      let post = await Post.findById(req.params.postID);
      // Mandiamo in risposta al client l'utente trovato
      res.send(post);
    } catch (err) {
      // In caso di errore, procediamo
      next(err);
    }
});

// get a specific author's posts
// delete all user's posts
postRoute.delete("/:userID/posts", async (req, res, next) => {
  try {
    // Cerchiamo un documento utente usando una query specificia: deve avere l'id uguale a quello passato come parametro all'indirizzo
    await Post.deleteMany({
      author: req.params.userID,
    });
    // Mandiamo un messaggio in risposta ed uno status code di 204
    res.send("I post dell'utente " + req.params.userID + "sono stati eliminati correttamente").status(204);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// modify a specific post
postRoute.put("/:postID", async (req, res, next) => {
  try {
    let post = await Post.findByIdAndUpdate(req.params.postID, req.body, {
      new: true,
    })
    res.send(post)
  } catch (error) {
    next(error)
  }
});
export default postRoute;