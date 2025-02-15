const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./others/db");
const pokemonRoutes = require("./routes/pokemonRoutes");

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/pokemon", pokemonRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
