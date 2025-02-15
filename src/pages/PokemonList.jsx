import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { setPokemonList } from "../redux/pokemonSlice";

function PokemonList() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemon.list);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`).then((response) => {
      const pokemonData = response.data.results.map((pokemon, index) => ({
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
      }));
      dispatch(setPokemonList(pokemonData));
      setLoading(false);
    });
  }, [dispatch, limit]);

  return (
    <div className="min-h-screen bg-sky-900 py-8 px-5">
      <div className="w-full max-w-4xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">Pokemon List</h1>
        <Link to="/my-pokemon" className="ml-auto">
          <button className="text-white bg-green-600 hover:bg-green-500 transition-all font-medium rounded-lg text-sm px-6 py-2.5">
            My Pokemon List
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
        {pokemons.map((pokemon, index) => (
          <Link
            key={index}
            to={`/pokemon/${pokemon.name}`}
            className="bg-white shadow-lg p-5 rounded-lg text-center transform transition hover:scale-105"
          >
            <img src={pokemon.image} alt={pokemon.name} className="mx-auto w-24 h-24" />
            <p className="text-lg font-semibold capitalize mt-2 text-gray-800">
              {pokemon.name}
            </p>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setLimit((prev) => prev + 10)}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-500 transition flex items-center"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                ></path>
              </svg>
              Loading...
            </>
          ) : (
            "Load More"
          )}
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
