let books = [
    {
        ISBN : "12345ONE",
        title: "Getting started with MERN",
        authors : ["1", "2"],
        lang : "en",
        pubDate : "2021-07-07",
        numOfPage : 225,
        category : ["fiction","technical","web-dev"],
        publications : 1,
    },
    {
            ISBN : "12345TWO",
            title: "Getting started with REACT",
            authors : ["1"],
            lang : "en",
            pubDate : "2021-07-07",
            numOfPage : 225,
            category : ["technical","web-dev"],
            publications : 1,
    },
];

let authors = [
    {
        id : 1,
        name : "pavan",
        books : ["12345ONE"],
    },
    {
        id : 2,
        name : "Akanksha",
        books : ["12345TWO"],
    },
];

const publications =[
    {
        id : 1,
        name : "Chakra",
        books : ["12345TWO"], 
    },
];

module.exports = {books, authors, publications};