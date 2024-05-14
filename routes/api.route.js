import { Router } from "express";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import cloudinaryMiddleware from "../middlewares/multer.js";
import cloudinaryMiddlewareCovers from "../middlewares/multerCover.js";

// Creiamo un nuovo Router e esportiamolo per essere utilizzato altrove
const apiRoute = Router();

/*
// Richiesta GET all'indirizzo "/" (Esempio: http:localhost:3001/api)
apiRoute.get("/", async (req, res) => {
  // Mandiamo una risposta al client di tipo messaggio testuale
  res.send("Sei al route principale dell'api");
});

// Richiesta GET all'indirizzo "/blogPosts" (Esempio: http:localhost:3001/api/fhjdjh2398fdhj2)
apiRoute.get("/blogPosts", async (req, res, next) => {
  try {
    console.log(req.body);
    // Cerchiamo un documento utente con l'id uguale a quello passato come parametro
    let post = await Post.find();
    // Mandiamo in risposta al client l'utente trovato
    res.send(post);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta GET all'indirizzo "/blogPosts/:id" (Esempio: http:localhost:3001/api/fhjdjh2398fdhj2)
apiRoute.get("/blogPosts/:id", async (req, res, next) => {
  try {
    console.log(req.body);
    // Cerchiamo un documento utente con l'id uguale a quello passato come parametro
    let post = await Post.findById(req.params.id);
    // Mandiamo in risposta al client l'utente trovato
    res.send(post);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta POST all'indirizzo "/blogposts" (Esempio: http:localhost:3001/api/fhjdjh2398fdhj2)
apiRoute.post("/blogPosts", async (req, res, next) => {

  try {
    console.log(req.body);
    // Creiamo un nuovo documento utente, con i valori presi dal body della richiesta
    let post = await Post.create(req.body);
    // Mandiamo in risposta l'utente creato e un status code di 400 (successo)
    res.send(post).status(400);
    
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta PUT all'indirizzo "/:id" (Esempio: http:localhost:3001/api/fhjdjh2398fdhj2)
apiRoute.put("/users/:id", async (req, res, next) => {
  try {
    // Cerchiamo un documento utente dal suo id e modifichiamolo con i valori presi dal body della richiesta
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // L'oggetto restituito deve essere quello aggiornato
    });
    res.send(user);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta PUT all'indirizzo "/blogPosts" (Esempio: http:localhost:3001/api/fhjdjh2398fdhj2)
apiRoute.put("/blogPosts/:id", async (req, res, next) => {
  try {
    // Cerchiamo un documento utente dal suo id e modifichiamolo con i valori presi dal body della richiesta
    let post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // L'oggetto restituito deve essere quello aggiornato
    });
    res.send(post);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta DELETE all'indirizzo "/blogPosts" (Esempio: http:localhost:3001/api/fhjdjh2398fdhj2)
apiRoute.delete("/blogPosts/:id", async (req, res, next) => {
  try {
    // Cerchiamo un documento utente usando una query specificia: deve avere l'id uguale a quello passato come parametro all'indirizzo
    await Post.deleteOne({
      _id: req.params.id,
    });
    // Mandiamo un messaggio in risposta ed uno status code di 204
    res.send("L'utente è stato eliminato correttamente").status(204);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});


// Richiesta GET all'indirizzo "/users" (Esempio: http:localhost:3001/api/fhjdjh2398fdhj2)
apiRoute.get("/users", async (req, res, next) => {
  try {
    console.log(req.body);
    // Cerchiamo un documento utente con l'id uguale a quello passato come parametro
    let user = await User.find();
    // Mandiamo in risposta al client l'utente trovato
    res.send(user);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta GET all'indirizzo "/users/:id" (Esempio: http:localhost:3001/api/fhjdjh2398fdhj2)
apiRoute.get("/users/:id", async (req, res, next) => {
    try {
      console.log(req.body);
      // Cerchiamo un documento utente con l'id uguale a quello passato come parametro
      let user = await User.findById(req.params.id);
      // Mandiamo in risposta al client l'utente trovato
      res.send(user);
    } catch (err) {
      // In caso di errore, procediamo
      next(err);
    }
});

// Richiesta POST all'indirizzo "/:id" (Esempio: http:localhost:3001/api/fhjdjh2398fdhj2)
apiRoute.post("/users", async (req, res, next) => {
  try {
    console.log(req.body);
    // Creiamo un nuovo documento utente, con i valori presi dal body della richiesta
    let user = await User.create(req.body);
    // Mandiamo in risposta l'utente creato e un status code di 400 (successo)
    res.send(user).status(400);
    
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta DELETE all'indirizzo "/" (Esempio: http:localhost:3001/api/fhjdjh2398fdhj2)
apiRoute.delete("users/:id", async (req, res, next) => {
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


apiRoute.patch("/users/:id/avatar", cloudinaryMiddleware, async(req,res,next) => {
  try {
    let updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {avatar: req.file.path},
      {new: true}
    )

    res.send(updatedUser);
  } catch (error){
    next(error);
  }

});

apiRoute.patch("/users/:id/age", cloudinaryMiddleware, async(req,res,next) => {
  try {
    let updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {age: req.params.id},
      {new: true}
    )

    res.send(updatedUser);
  } catch (error){
    next(error);
  }

});

apiRoute.patch("/blogPosts/:id/cover", cloudinaryMiddlewareCovers, async(req,res,next) => {
  try {
    let updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {cover: req.file.path},
      {new: true}
    )

    res.send(updatedPost);
  } catch (error){
    next(error);
  }
});
*/
export default apiRoute;