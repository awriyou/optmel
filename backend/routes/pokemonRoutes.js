const express = require("express");
const router = express.Router();
const { catchPokemon, getCaughtPokemon, releasePokemon } = require("../controllers/pokemonController");

router.post("/catch", catchPokemon);  
router.get("/caught", getCaughtPokemon);  
router.delete("/release/:id", releasePokemon);  

module.exports = router;
