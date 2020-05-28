const express  = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const schema = require("../server/schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://127.0.0.1:27017/graphql-demo",{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open',()=>{
    console.log("DB Connected");
})

app.use(cors());

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql : true
}));





app.listen(4000,()=>{
    console.log("Server is listening on port 4000");
})