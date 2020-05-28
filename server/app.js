const express  = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 4000;
const db_url = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/graphql-demo";

mongoose.connect(db_url,{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open',()=>{
    console.log("DB Connected");
})

app.use(cors());

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql : true
}));





app.listen(port,()=>{
    console.log("Server is listening on port",port);
})