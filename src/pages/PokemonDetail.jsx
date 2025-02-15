import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { catchPokemon } from "../redux/pokemonSlice";

function PokemonDetail() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useState(null);
  const [message, setMessage] = useState("");
  const [moveEffect, setMoveEffect] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) => {
      setPokemon(response.data);
      setLoading(false);
    });
  }, [name]);

  const handleCatch = () => {
    const success = Math.random() < 0.5;
    if (success) {
      const nickname = prompt("Berikan nama untuk Pokemon ini:");
      if (nickname) {
        dispatch(catchPokemon({ name, nickname }));
        setMessage(`Berhasil menangkap! Nama: ${nickname}`);
      }
    } else {
      setMessage("Gagal menangkap! Coba lagi.");
    }
  };

  const fetchMoveDetails = async (moveUrl) => {
    try {
      const response = await axios.get(moveUrl);
      const effectText = response.data.effect_entries.find(
        (entry) => entry.language.name === "en"
      )?.effect;
      setMoveEffect(effectText || "No effect available.");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching move details:", error);
      setMoveEffect("Failed to load effect.");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-900 px-5 py-10 relative">
      {loading ? (
        <p className="text-2xl text-white">Loading....</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
          <h1 className="text-3xl font-bold capitalize text-gray-800">{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-40 h-40 mx-auto" />

          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Types:</h2>
            <div className="flex justify-center gap-2">
              {pokemon.types.map((type, index) => (
                <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm capitalize">
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Moves:</h2>
            <div className="grid grid-cols-2 gap-2">
              {pokemon.moves.slice(0, 5).map((move, index) => (
                <button
                  key={index}
                  onClick={() => fetchMoveDetails(move.move.url)}
                  className="bg-gray-200 px-3 py-1 rounded-lg text-sm capitalize hover:bg-gray-300 transition"
                >
                  {move.move.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCatch}
            className="mt-5 bg-green-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-green-500 transition-transform transform hover:scale-105"
          >
            Catch Pokemon
          </button>

          {message && <p className="mt-3 text-lg font-semibold text-gray-800">{message}</p>}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Move Effect</h2>
            <p className="text-gray-800">{moveEffect}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonDetail;
