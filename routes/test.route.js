import { Router } from "express";

// Creiamo un nuovo Router e esportiamolo per essere utilizzato altrove
export const testRoute = Router();

// Richiesta GET all'indirizzo "/" (Esempio: http:localhost:3001/test)
testRoute.get("/", async (req, res) => {
  // Mandiamo un messaggio di riposta
  res.send("Sei al route principale");
});

// Richiesta GET all'indirizzo "/" (Esempio: http:localhost:3001/test/hello)
testRoute.get("/hello", async (req, res) => {
  // Mandiamo un messaggio di risposta
 
});