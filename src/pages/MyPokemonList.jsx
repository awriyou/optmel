import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCaughtPokemon, releasePokemon } from "../redux/pokemonSlice";
import { useNavigate } from "react-router-dom";

function MyPokemonList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { caught = [], status, error } = useSelector((state) => state.pokemon || {});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCaughtPokemon());
    }
  }, [dispatch, status]);

  return (
    <div className="min-h-screen flex flex-col items-center p-5 bg-sky-900">
      <h1 className="text-5xl font-bold text-white">My Pokemon List</h1>
      {status === "loading" && <p className="mt-4 text-lg text-white">Loading...</p>}
      {status === "failed" && <p className="mt-4 text-lg text-red-500">Error: {error}</p>}
      {status === "succeeded" && caught.length === 0 && (
        <p className="mt-4 text-lg text-yellow-200">Belum ada Pokemon yang ditangkap.</p>
      )}

      {status === "succeeded" && caught.length > 0 && (
        <div className="mt-4 w-full max-w-md">
          {caught.map((pokemon) => (
            <div
              key={pokemon._id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center mt-2 transition hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate(`/pokemon/${pokemon.name}`)}
            >
              <div className="flex items-center">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                  className="w-14 h-14 mr-3"
                />
                <p className="capitalize font-semibold text-gray-800">
                  {pokemon.nickname} <span className="text-gray-500">({pokemon.name})</span>
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(releasePokemon(pokemon._id));
                }}
                className="bg-red-500 text-white px-3 py-1 rounded-lg transition hover:bg-red-600 active:scale-95"
              >
                Release
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPokemonList;
