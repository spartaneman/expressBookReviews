const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
  let validUser = users.filter((user)=>{
    return user.username === username;
  });
  if(validUser.length > 0){
    return false;
  }
  else{
    return true;
  }

}

const authenticatedUser = (username,password)=>{ 
  let validUser = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validUser.length > 0){
    return true;
  }
  else{
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.params.username;
  const password = req.params.password;

  if(!username || !password){
    res.status(404).json({status: "fail", message: "Error Loggin In"})
  }
  if(authenticatedUser(username, password)){

  }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
