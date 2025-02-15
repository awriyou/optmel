const Pokemon = require("../models/Pokemon");

exports.catchPokemon = async (req, res) => {
  try {
    const { id, name, nickname } = req.body;

    if (!id || !name || !nickname) {
      return res.status(400).json({ error: "ID, name, dan nickname harus diisi!" });
    }

    const newPokemon = new Pokemon({ id, name, nickname });
    await newPokemon.save();
    res.status(201).json({ message: "Pokemon caught!", pokemon: newPokemon });
  } catch (error) {
    res.status(500).json({ error: "Failed to catch Pokemon." });
  }
};

exports.getCaughtPokemon = async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons); 
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Pokemon list." });
  }
};

exports.releasePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    await Pokemon.findByIdAndDelete(id);
    res.json({ message: "Pokemon released!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to release Pokemon." });
  }
};
