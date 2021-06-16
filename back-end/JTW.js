const {sign, verify} = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (user) => {
  const {id, username} = user;
  
  const accessToken = sign({ id: id, username: username}, JWT_SECRET);

  return accessToken;
}

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["reading-token"];

  // if (!accessToken) return res.status(400).json({ error: 'User not authenticated.'});
  if (!accessToken) return res.status(400).send('User not authenticated.');
  try {
    const validToken = verify(accessToken, JWT_SECRET)
    if (validToken) {
      req.authenticated = true
      return next();
    } 
  } catch(err) {
      return res.status(400).send('User not auth');
      // return res.status(400).json({ error: err });
  }
}

module.exports = { createToken, validateToken }