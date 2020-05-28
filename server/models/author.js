const mongoose = require("mongoose");
const schema = mongoose.Schema;

const auhtorSchema = new schema({
    name : String,
    age : Number
})

module.exports = mongoose.model("Author",auhtorSchema);
