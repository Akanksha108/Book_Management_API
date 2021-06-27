const express = require("express");

const shapeAI = express();

shapeAI.use(express.json());

const database = require("./database/index");

/*Route             /
  Description       Get all books
  Access            Public
  Parameters        None
  Method            GET
 */

shapeAI.get("/", (req, res) => {
    return res.json({books : database.books});
});

shapeAI.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN ===req.params.isbn);
});



shapeAI.listen(3000, () => console.log("Server running!"));



