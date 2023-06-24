const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
books = Object.values(books);

public_users.post("/register", (req, res) => {
  const username = req.params.username;
  const password = req.params.username;

  if (!username || !password) {
    return res
      .status(404)
      .json({ status: "Failed", message: "Missing Information" });
  }
  if (isValid(username)) {
    users.push({ username: username, password: password });
    return res
      .status(200)
      .json({ status: "success", message: "User Registered" });
  } else {
    return res
      .status(208)
      .json({ status: "fail", message: "User already exists" });
  }
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  return res.status(200).json(
    JSON.stringify(
      {
        status: "success",
        data: { books },
      },
      null,
      1
    )
  );
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  let iBooks = books[isbn];
  if (iBooks) {
    return res
      .status(200)
      .json(JSON.stringify({ status: "success", data: { iBooks } }));
  } else {
    return res
      .status(404)
      .json({ status: "fail", message: "ISBN not found in our database" });
  }
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  let iBooks = books.filter((book) => {
    return book.author === author;
  });
  if (iBooks.length > 0) {
    return res
      .status(200)
      .json(JSON.stringify({ status: "success", data: { iBooks } }));
  } else {
    return res
      .status(404)
      .json({ status: "fail", message: "Author not found in our database" });
  }
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  let iBooks = books.filter((book) => {
    return book.title === title;
  });
  if (iBooks.length > 0) {
    return res
      .status(200)
      .json(JSON.stringify({ status: "success", data: { iBooks } }));
  } else {
    return res
      .status(404)
      .json({ status: "fail", message: "T not found in our database" });
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
