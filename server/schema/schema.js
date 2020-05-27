const graphql = require("graphql");
const _ = require("lodash");

const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLInt,
    GraphQLString, 
    GraphQLList,
    GraphQLSchema } = graphql;

var Books = [
    { name: "Name of the Wind",genre : "Fantasy",id:"1", authorId : "1"},
    { name: "Name of the Fire",genre : "Fantasy",id:"2", authorId : "2"},
    { name: "The Long Earth",genre : "Sci-Fi",id:"3", authorId: "3"}
];

var Authors = [
    { name: "Patrick", age: 43, id: "1"},
    { name: "Brandson", age: 23, id: "2"},
    { name: "Terry", age: 32, id: "3"}
];

const BookType = new GraphQLObjectType({
    name : "Book",
    fields: () => ({
        id : { type : GraphQLID },
        name : { type : GraphQLString },
        genre : { type : GraphQLString },
        author : {
            type : AuthorType,
            resolve(parent,args){
                return _.find(Authors,{ id : parent.authorId})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name : "Author",
    fields: () => ({
        id : { type : GraphQLID },
        name : { type : GraphQLString },
        age : { type : GraphQLInt },
        book : {
            type : new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(Books,{ authorId : parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        book:{
            type : BookType,
            args : { id: { type : GraphQLID}},
            resolve(parent,args){
                return _.find(Books,{ id : args.id})
            }
        },
        author:{
            type : AuthorType,
            args : { id: { type : GraphQLID}},
            resolve(parent,args){
                return _.find(Authors,{ id : args.id})
            }
        },
        books:{
            type : new GraphQLList(BookType),
            resolve(parent,args){
                return Books
            }
        },
        authors:{
            type : new GraphQLList(AuthorType),
            resolve(parent,args){
                return Authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery
})