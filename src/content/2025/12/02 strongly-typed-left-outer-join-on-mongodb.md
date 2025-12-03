---
date: 2025-12-02
---

::post-title{:date="date"}
# Strongly Typed Left Outer Join on MongoDB
::

<br/>

Only on the road that you'll see potholes, not on the map. So, I want to perform left outer join on two collections in MongoDB. Lookup has been great ([https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/]{.text-blue-600}), but I want it strongly typed in C#.

<br/>

Let's take the Movies and Reviews example where:

<br/>

::code-block
```
public class Movie
{
    public ObjectId Id { get; set; }
    public string Title { get; set; }
    public IEnumerable<Review> Reviews { get; set; } = [];
}

public class Review
{
    public ObjectId Id { get; set; }
   
    [BsonElement("movie_id")]
    public ObjectId MovieId { get; set; }

    public int Rating { get; set; }
}
```
::

<br/>

To simply join all movies to reviews, we can do using `Aggregate().Lookup()`{.bg-gray-200 .p-2 .rounded}

::code-block
```
IMongoCollection<Movie> movieCollection = ...;
IMongoCollection<Review> reviewCollection = ...;

var moviesWithReviews = await movieCollection.Aggregate()
  .Lookup<Movie, Review, Movie>(
    foreignCollection: reviewCollection,
    localField: movie => movie.Id,
    foreignField: review => review.MovieId,
    @as: movie => movie.Reviews).ToListAsync();
```
::

<br/>

But if we need additional condition, for example `Movie.Title == "Beauty and the Beast"`{.bg-gray-200 .p-2 .rounded}, we need to use pipeline. [https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/#std-label-lookup-multiple-joins]{.text-blue-600}. So, the query to MongoDB is similar to:

::code-block
```
db.movie.aggregate( [
   {
      $lookup:
         {
           from : "reviews",
           localField : "_id",
           foreignField : "movie_id",
           let : { pipeline_title: "$title" },
           pipeline : [
              { $match :
                 { $expr :
                      { $eq: [ "$$pipeline_title", "Beauty and the Beast" ] }
                 }
              }
           ],
           as : "Reviews"
         }
    }
] )
```
::

<br/>

Notes the use of let. It is because the pipeline has no access to the input. And to access the pipeline variable, we need double dollar sign ($$). From the documentation:

::code-block
```
The pipeline cannot access fields from input documents. Instead, define variables for the document fields using the let option and then reference the variables in the pipeline stages.
```
::

<br/>

To convert to C#, there's no Lookup overload that's similar to the query above. But we can do the following query and utilize one of the overloads:

::code-block
```
db.movie.aggregate( [
   {
      $lookup:
         {
           from : "reviews",
           let : { pipeline_title: "$title", pipeline_id: "$_id" },
           pipeline : [
              { $match :
                 { $expr :
                      { $and: [
                        { $eq: [ "$movie_id", "$$pipeline_id" ]},
                        { $eq: [ "$$pipeline_title", "Beauty and the Beast" ] }
                      ]}
                      
                 }
              }
           ],
           as : "Reviews"
         }
    }
] )
```
::

<br/>

In C#, it becomes:

::code-block
```
var lookupPipeline = new EmptyPipelineDefinition<Review>()
  .Match(new BsonDocument("$expr",
          new BsonDocument("$and", new BsonArray
          {
            new BsonDocument("$eq", new BsonArray { "$movie_id", "$$pipeline_id" }),
            new BsonDocument("$eq", new BsonArray { "$$pipeline_title", "Beauty and the Beast" 
          })
  })));

var moviesWithReviews = await movieCollection.Aggregate()
  .Lookup<Movie, Review, IEnumerable<Review>, Movie>(
      foreignCollection: reviewCollection,
      let: new BsonDocument { { "pipeline_title": "$title" }, { "pipeline_id", "$_id" } },
      lookupPipeline: lookupPipeline,
      @as: new ExpressionFieldDefinition<Movie, IEnumerable<Review>>(movie => movie.Reviews))
  .ToListAsync();
```
::

<br/>

If we want the lookupPipeline to be strongly typed, especially on the `Review.MovieId`{.bg-gray-200 .p-2 .rounded} field we are can't do the following since pipeline variable is only accessible with `$expr`{.bg-gray-200 .p-2 .rounded} operator. As far as I experienced, I don't see any C# equivalent for the operator.

::code-block
```
var lookupPipeline = new EmptyPipelineDefinition<Review>()
  .Match(review => review.MovieId == "$$pipeline_id" && "$$pipeline_title" == "Beauty and the Beast");
```
::

And the following doesn't work either:

::code-block
```
var filterBuilder = Builders<Review>.Filter;

var filter = filterBuilder.And(
    filterBuilder.Eq(review => review.MovieId, "$$pipeline_id"),
    filterBuilder.Eq("$$pipeline_title", "Beauty and the Beast"));
```
::

<br/>

After more trials and errors, I found MongoDB LINQ Syntax for Aggregation. [https://www.mongodb.com/docs/drivers/csharp/current/aggregation/linq/#lookup--]{.text-blue-600}. The one that finally works look like:

::code-block
```
var movieCollectionQuery = movieCollection.AsQueryable();

var lookupResults = await movieCollectionQuery.Lookup<Movie, Review, Review>(
            reviewCollection,
            (movie, reviews) => reviews.Where(review => review.MovieId == movie.Id && movie.Title == "Beauty and the Beast")).ToListAsync();

var moviesWithReviews = [..lookupResults.Select(result =>
{
    var movie = result.Local;
    movie.Reviews = result.Results;
    return movie;
})];
```
::
