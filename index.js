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

/*Route             /is/:isbn
  Description       Get specific book based on ISBN
  Access            Public
  Parameters        ISBN
  Method            GET
 */

shapeAI.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN ===req.params.isbn);

    if(getSpecificBook.length === 0){
        return res.json({error : `No book found for the ISBN of ${req.params.isbn}`});
    }
    return res.json({books : getSpecificBook});
});

/*Route             /c/:category
  Description       Get specific book based on category
  Access            Public
  Parameters        Category
  Method            GET
 */
 shapeAI.get("/c/:category", (req, res) => {
     const getSpecificBook = database.books.filter((book) => 
         book.category.includes(req.params.category)
     );
     if(getSpecificBook.length === 0){
        return res.json({error : `No book found of the category ${req.params.category}`});
    }
    return res.json({books : getSpecificBook});

 });

 /*Route             /a2/:author
  Description       Get specific book based on author
  Access            Public
  Parameters        Author
  Method            GET
 */
  shapeAI.get("/aa/:author", (req, res) => {
    const getSpecificBook = database.books.filter((book) => 
         book.authors.includes(req.params.author) 
    );
    console.log(getSpecificBook);
    if(getSpecificBook.length === 0){
        return res.json({error : `No book found for the author ${req.params.author}`});
    }
    return res.json({ books : getSpecificBook});
 });

 /*Route             /a/:authors
  Description       Get all authors
  Access            Public
  Parameters        None
  Method            GET
 */
shapeAI.get("/a/:author", (req, res) => {
    return res.json({authors : database.authors});
});

/*Route             /a/:isbn
  Description       Get specific author based on ISBN
  Access            Public
  Parameters        ISBN
  Method            GET
 */
shapeAI.get("/a1/:isbn", (req, res) => {
    const getSpecificAuthor = database.authors.filter((author) => 
    author.books.includes(req.params.isbn));

    if(getSpecificAuthor.length === 0){
        return res.json({error : `No author found for the book ${req.params.isbn}`});
    }
    return res.json({author : getSpecificAuthor});
});

/*Route             /p/:publication
  Description       Get all publications
  Access            Public
  Parameters        None
  Method            GET
 */
shapeAI.use("/p/:publication", (req, res) => {
    return res.json({publications : database.publications});
});


/*Route             /publication/:isbn
  Description       Get specific publication based on book
  Access            Public
  Parameters        ISBN
  Method            GET
 */
shapeAI.get("/publications/:book", (req, res) => {
    const getSpecificPublication = database.publications.filter((publication) => 
        publication.books.includes(req.params.book)
        ); 

    if(getSpecificPublication.length === 0){
        return res.json({error : `${req.params.book} not found`});
    }
    return res.json({publications : getSpecificPublication});
});

/*Route             /book/new
  Description       Add a new book
  Access            Public
  Parameters        None
  Method            POST
 */
shapeAI.post("/book/new", (req, res) => {
    const { newBook } = req.body;
    database.books.push(newBook);
    return res.json({books: database.books, message: " Book was Added"});
});

/*Route             /author/new
  Description       Add a new author
  Access            Public
  Parameters        None
  Method            POST
 */
shapeAI.post("/author/new", (req, res) => {
    const { newAuthor } = req.body;
    database.authors.push(newAuthor);
    return res.json({authors: database.authors, message: "New Author was Added"});
});

/*Route             /publication/new
  Description       Add a new author
  Access            Public
  Parameters        None
  Method            POST
 */
shapeAI.post("/publication/new", (req, res) => {
    const { newPublication } = req.body;
    database.publications.push(newPublication);
    return res.json({publications : database.publications, message:"New Publication Added"});
});

/*Route             /book/update
  Description       Update Book Title
  Access            Public
  Parameters        ISBN
  Method            PUT
 */
shapeAI.put("/book/update/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.title = req.body.bookTitle;
            return;
        }
    });
    return res.json({ books: database.books});
});

/*Route             /book/autor/update
  Description       Update Author
  Access            Public
  Parameters        ISBN
  Method            PUT
 */
shapeAI.put("/book/autor/update/:isbn", (req, res) => {
    //Update Book DB
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            return book.authors.push(req.body.newAuthor);
        }
    });

    //Update Author DB
    database.authors.forEach((author) => {
        if(author.id === req.body.newAuthor)
        return author.books.push(req.params.isbn);
    });
    return res.json({books : database.books, authors: database.authors, message:"New Author was Added"});
});

/*Route             /author/name/update
  Description       Update Author Name
  Access            Public
  Parameters        ID
  Method            PUT
 */
shapeAI.put("/author/name/update/:id", (req, res) => {
    database.authors.forEach((author) => {
        if(author.id == req.params.id){
            author.name = req.body.authorName;
            return;
        }
    });
    return res.json({ authors: database.authors});
});


/*Route             /publication/name/update
  Description       Update publication Name
  Access            Public
  Parameters        ID
  Method            PUT
 */
shapeAI.put("/publication/name/update/:id", (req, res) => {
    database.publications.forEach((publication) => {
        if(publication.id == req.params.id){
            publication.name = req.body.publicationName;
            return;
        }
    });
    return res.json({publications : database.publications, message:"Publication name Updated"});
});


shapeAI.listen(3000, () => console.log("Server running!"));



