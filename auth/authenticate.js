import jwt from "jsonwebtoken"

import User from "../models/user.model.js";

export const generateJWT = (payload) => {
  return new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1 day" },
      (err, token) => {
        if (err) rej(err)
        else res(token)
      }
    )
  )
}

export const verifyJWT = (token) => {
  return new Promise((res, rej) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) res(err)
      else res(decoded)
    })
  )
}

export const authMidd = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) res.status(401).send("Please login.")
    else {
      const decoded = await verifyJWT(
        req.headers["authorization"].replace("Bearer ", "")
      )
      if (decoded.exp) {
        //if there is a token (otherwise it's an error)
        delete decoded.iat
        delete decoded.exp
        const me = await User.findOne({
          ...decoded,
        })
        if (me) {
          req.user = me
          next()
        } else res.status(401).send("Author not found.")
      } else res.status(401).send("Please login again.")
    }
  } catch (error) {
    next(error)
  }
}