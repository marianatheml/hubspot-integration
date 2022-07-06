const mongoose = require("mongoose");

const Contact = new mongoose.Schema({
    email : { type: String, require: true},
    telefone : { type: String, require: true},
    aniversario : { type: Date, require: true},
})

module.exports = mongoose.model("Contact", Contact);