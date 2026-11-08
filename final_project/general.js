const axios = require('axios');

const baseURL = 'http://localhost:5000';


// TASK 10: Get all books using Promise callback (.then)
function getAllBooks() {
    axios.get(`${baseURL}/`)
        .then(response => {
            console.log("TASK 10: All Books");
            console.log(response.data);
        })
        .catch(error => {
            console.log("Error:", error.message);
        });
}


// TASK 11: Get book by ISBN using Promise
function getBooksByISBN() {
    return axios.get(`${baseURL}/isbn/1`)
        .then(response => {
            console.log("TASK 11: Book by ISBN");
            console.log(response.data);
        })
        .catch(error => {
            console.log("Error:", error.message);
        });
}


// TASK 12: Get books by Author using Promise
function getBooksByAuthor() {
    return axios.get(`${baseURL}/author/Chinua%20Achebe`)
        .then(response => {
            console.log("TASK 12: Books by Author");
            console.log(response.data);
        })
        .catch(error => {
            console.log("Error:", error.message);
        });
}


// TASK 13: Get books by Title using Async/Await
async function getBooksByTitle() {
    try {
        const response = await axios.get(
            `${baseURL}/title/Things%20Fall%20Apart`
        );

        console.log("TASK 13: Books by Title");
        console.log(response.data);

    } catch (error) {
        console.log("Error:", error.message);
    }
}


// Execute all four functions
async function runTasks() {
    await getAllBooks();
    await getBooksByISBN();
    await getBooksByAuthor();
    await getBooksByTitle();
}

runTasks();