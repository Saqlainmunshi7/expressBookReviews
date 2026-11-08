const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

// Task 6: Register a new user
public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    if (isValid(username)) {
        return res.status(409).json({
            message: "Username already exists"
        });
    }

    users.push({
        username: username,
        password: password
    });

    return res.status(201).json({
        message: "User successfully registered"
    });
});


// Task 1: Get the list of all books
public_users.get('/', function (req, res) {
    return res.status(200).json(books);
});


// Task 2: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(200).json(books[isbn]);
    }

    return res.status(404).json({
        message: "Book not found"
    });
});


// Task 3: Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.toLowerCase();

    const matchedBooks = Object.keys(books)
        .filter(isbn => books[isbn].author.toLowerCase() === author)
        .map(isbn => books[isbn]);

    return res.status(200).json(matchedBooks);
});


// Task 4: Get book details based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase();

    const matchedBooks = Object.keys(books)
        .filter(isbn => books[isbn].title.toLowerCase() === title)
        .map(isbn => books[isbn]);

    return res.status(200).json(matchedBooks);
});


// Task 5: Get book reviews based on ISBN
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(200).json(books[isbn].reviews);
    }

    return res.status(404).json({
        message: "Book not found"
    });
});

module.exports.general = public_users;