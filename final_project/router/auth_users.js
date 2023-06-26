const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  { username: "eman_ruiz", password: "hello123" },
  { username: "moko", password: "eman" },
  { username: "node_student", password: "password123" },
];

const isValid = (username) => {
  let validUser = users.filter((user) => {
    return user.username === username;
  });
  if (validUser.length > 0) {
    return false;
  } else {
    return true;
  }
};

const authenticatedUser = (username, password) => {
  let validUser = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  if (validUser.length > 0) {
    return true;
  } else {
    return false;
  }
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ status: "fail", message: "Error Loggin In" });
  }
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({ data: password }, "access", {
      expiresIn: 60 * 60,
    });

    req.session.authorization = { accessToken, username };
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({
      status: "fail",
      message: "Invalid Login. Check username and password",
    });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let username = req.session.authorization.username;
  const isbn = req.params.isbn;
  let bookReview = books[isbn];

  if (bookReview) {
    const review = req.query.review;
    books[isbn].reviews[username] = review;
    res.status(200).json({
      status: "success",
      message: `${username}, your review was successfully added to book with ISBN ${isbn}`
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Failed to find isbn",
    });
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  let username = req.session.authorization.username;
  const isbn = req.params.isbn;
  let bookReview = books[isbn];

  if (bookReview) {
    delete books[isbn].reviews[username];
    res.status(200).json({
      status: "success",
      message: "Review Successfully deleted",
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Failed to find isbn",
    });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
