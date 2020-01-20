var express = require('express');
var router = express.Router();
var database = require('../search-db.js');
var moment = require('moment')

// DEBUGONLY
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/getTreatisesList', function(req, res) {
  //let password = req.body.params.password
  //let user = req.body.params.user.trim().toLowerCase()
  database.query("SELECT author, title, year FROM treatises WHERE available = 1",
                function (err, results){
                  if (err) {console.log(err)}
                    res.json(results)
                  })
});

router.post('/getRawData', function(req, res) {
  //list of treatises in the form {author: 'xxx', title: 'xxx', year: xxx}
  let treatises = req.body.params.treatises
  //list of books by number
  let books = req.body.params.books
  //list of chapters by number
  let chapters = req.body.params.chapters
  //list of parts by number
  let parts = req.body.params.parts
  //compute query condition for treatises

  let treatisesCondition = "AND ("
  for (t of treatises)
    treatisesCondition+= "(treatises.author = '"+t.author+"' AND treatises.title = '"+t.title.replace(/'/g,'\\\'')+"' AND treatises.year = "+t.year+") OR "
  treatisesCondition+= "0) "
  let booksCondition = (books.length > 0 ? " AND books.number IN "+JSON.stringify(books).replace('[','(').replace(']',')'): "")
  let chaptersCondition = (chapters.length > 0 ? " AND chapters.number IN "+JSON.stringify(chapters).replace('[','(').replace(']',')'): "")
  let partsCondition = (parts.length > 0 ? " AND parts.number IN "+JSON.stringify(parts).replace('[','(').replace(']',')'): "")
  database.query("SELECT treatises.author, treatises.title, treatises.year, books.number AS book, books.title AS bookTitle, chapters.number AS chapter, chapters.title AS chapterTitle, parts.number AS part, parts.title AS partTitle, text, parts.transcriber1, parts.transcriber2 FROM treatises, books, chapters, parts"+
                 " WHERE"+
                 " chapters.treatise_author = treatises.author"+
                 " AND chapters.treatise_title = treatises.title"+
                 " AND chapters.treatise_year = treatises.year"+
                 " AND books.treatise_author = treatises.author"+
                 " AND books.treatise_title = treatises.title"+
                 " AND books.treatise_year = treatises.year"+
                 " AND chapters.book_number = books.number"+
                 " AND parts.treatise_author = treatises.author"+
                 " AND parts.treatise_title = treatises.title"+
                 " AND parts.treatise_year = treatises.year"+
                 " AND parts.chapter_number = chapters.number"+
                 " AND (parts.book_number = chapters.book_number OR parts.book_number = 0)"+
                 booksCondition+
                 chaptersCondition+
                 partsCondition+
                 " "+treatisesCondition+
                 "ORDER BY chapters.treatise_year, chapters.treatise_author, parts.book_number, chapters.number, parts.number",
                function (err, results){
                  if (err) {console.log(err)}
                    res.json(results)
                  })
});

module.exports = router;
