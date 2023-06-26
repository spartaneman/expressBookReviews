const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();
bookList = Object.values(books);



public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.username;

  if (!username || !password) {
    return res
      .status(404)
      .json({ status: "Failed", message: "Missing Information" });
  }
  if (isValid(username)) {
    users.push({ username: username, password: password });
    return res
      .status(200)
      .json({ status: "success", message: "Customer successfully registered. Now you can login" });
  } else {
    return res
      .status(208)
      .json({ status: "fail", message: "User already exists" });
  }
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  return res.status(200).json(books)
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  let iBooks = books[isbn];
  if (iBooks) {
    return res
      .status(200)
      .json(iBooks);
  } else {
    return res
      .status(404)
      .json({ status: "fail", message: "ISBN not found in our database" });
  }
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  let iBooks = bookList.filter((book) => {
    return book.author === author;
  });
  if (iBooks.length > 0) {
    return res
      .status(200)
      .json(iBooks);
  } else {
    return res
      .status(404)
      .json({ status: "fail", message: "Author not found in our database" });
  }
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  let iBooks = bookList.filter((book) => {
    return book.title === title;
  });
  if (iBooks.length > 0) {
    return res
      .status(200)
      .json({ "booksbytitle": iBooks} );
  } else {
    return res
      .status(404)
      .json({ status: "fail", message: "T not found in our database" });
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  let bReview = books[isbn];
  if(bReview){
    return res.status(200).json({"reviews" :bReview.reviews})
  }
  else{
    return res.status(200).json({ message: "Review not found" });
  }
  
});

module.exports.general = public_users;

