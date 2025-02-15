const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: true },
  nickname: { type: String, required: true },
});

module.exports = mongoose.model("Pokemon", PokemonSchema);
