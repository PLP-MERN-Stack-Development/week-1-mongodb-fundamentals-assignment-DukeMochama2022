//finding all books in a specific genre
db.books.find({genre:"Fiction"})

//find books published after a certian year
db.books.find({
    published_year:{$gt:1950}
});

//find books by specific author
db.books.aggregate([
    {$match:{author:"Harper Lee"}}
])

// update a book's price

db.books.updateOne(
    {title:"The Alchemist"},
    {$set:{price:20.50}}
)

//delete a book by title

db.books.deleteOne(
    {title:"The Alchemist"}
)


//Advanced queries

//books in stock and published in after 2010
db.books.aggregate([
    {$match:{in_stock:true}},
    {$match:{published_year:{$gt:2010}}}
  ])

// display title, author and price
db.books.aggregate([
    {$project:{_id:0,title:1,author:1,price:1}}
  ])
  
// sort books by ascending and descending order
db.books.aggregate([
    {$sort:{price:-1}}
  ])

  // sort books by ascending order
  db.books.aggregate([
    {$sort:{price:1}}
  ])

  // Pagination: page 1 first 5 books
db.books.find().skip(0).limit(5);

// Pagination: page 2 next 5 books
db.books.find().skip(5).limit(5);


// Average price of books by genre
db.books.aggregate([
    {
      $group: {
        _id: "$genre",
        average_price: { $avg: "$price" }
      }
    }
  ]);

  // author with most books
  db.books.aggregate([
    {$group:{_id:"$author",count:{$sum:1}}},
    {$sort:{count:-1}},
    {$limit:1}
  ])

// group books by decade and count
db.books.aggregate([
    {
      $project: {
        decade: {
          $concat: [
            { $substr: [{ $subtract: ["$published_year", { $mod: ["$published_year", 10] }] }, 0, 4] },
            "s"
          ]
        }
      }
    },
    {
      $group: {
        _id: "$decade",
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

//indexing

// Create an index on the title field
db.books.createIndex({title:1})

// create a compound index onauthor and published year
db.books.createIndex({author:1,published_year:1})

// // Use explain to check performance
db.books.find({ title: "Sapiens" }).explain("executionStats");

db.books.find({ author: "Robert C. Martin", published_year: 2008 }).explain("executionStats");

