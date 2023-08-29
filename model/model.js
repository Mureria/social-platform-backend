const mongoose = require("mongoose");

const modelSchema = {
    name: String,
    email: String,
    password: string
}

const Schema = mongoose.model("Schema", modelSchema);

module.exports = Schema;