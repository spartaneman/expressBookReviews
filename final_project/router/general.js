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

/** PROMISES - ASYNC */
public_users.get('/books', (req, res)=>{
  const get_books = async()=>{
    res.send(JSON.stringify({books}, null, 4))
    console.log("Task 10: Successfully sent books ")
  }
  
  get_books();
})

// TASK 10 - Get the book list available in the shop using promises
public_users.get('/books/isbn/:isbn',function (req, res) {

  const get_books = new Promise((resolve, reject) => {
      const isbn = req.params.isbn;
      const iBook = books[isbn];
      if(iBook){
        resolve(res.status(200).json(iBook));
        console.log("Book located")
      }
      else{
        reject(res.status(404).json({status: "failed", message: "Unable to locate books"}));
      }
      
    });

    get_books.then(() => console.log("Promise for Task 11 resolved"))
    .catch(()=> console.log("Book could not be located"));

});

public_users.get("/books/author/:author", function (req, res) {

  const get_books = new Promise((resolve, reject)=>{
    const author = req.params.author;
    let aBooks = bookList.filter((book) => {
      return book.author === author;
    });
    if (aBooks.length > 0) {
      resolve(
        res
        .status(200)
        .json(aBooks)
      ); 
    } else {
      reject(
        res.status(404)
        .json({ status: "failed", message: "Author not found in our database" })
      );
        
  }
  });
  
  get_books.then(() => console.log("Promise for Task 12 resolved"))
  .catch(()=> console.log("Author could not be located"));
});

public_users.get("/books/title/:title", function (req, res) {

  const get_books = new Promise((resolve, reject)=>{
    const title = req.params.title;
    let tBooks = bookList.filter((book) => {
    return book.title === title;
  });
  if (tBooks.length > 0) {
    resolve(res
      .status(200)
      .json({ "booksbytitle": tBooks} )) ;
  } else {
    reject(res
      .status(404)
      .json({ status: "fail", message: "T not found in our database" }));
  }
  });

  get_books.then(() => console.log("Promise for Task 13 resolved"))
  .catch(()=> console.log("Title could not be located"));
  
});


module.exports.general = public_users;

