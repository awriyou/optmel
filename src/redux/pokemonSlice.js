import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/pokemon";

export const fetchCaughtPokemon = createAsyncThunk(
  "pokemon/fetchCaught",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/caught`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

export const catchPokemon = createAsyncThunk(
  "pokemon/catch",
  async ({ name, nickname }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      const pokemonId = response.data.id;

      const saveResponse = await axios.post(`${API_URL}/catch`, {
        id: pokemonId,
        name,
        nickname,
      });

      return saveResponse.data.pokemon;
    } catch (error) {
      return rejectWithValue("gagal menangkap Pokemon.");
    }
  }
);

export const releasePokemon = createAsyncThunk(
  "pokemon/release",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/release/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue("gagal melepaskan Pokemon.");
    }
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    list: [],
    caught: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setPokemonList: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaughtPokemon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCaughtPokemon.fulfilled, (state, action) => {
        // console.log("Fetched ", action.payload); 
        state.status = "succeeded"; 
        state.caught = action.payload;
      })
      .addCase(fetchCaughtPokemon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(catchPokemon.fulfilled, (state, action) => {
        // console.log("Caught", action.payload); 
        state.caught.push(action.payload);
      })
      .addCase(releasePokemon.fulfilled, (state, action) => {
        // console.log("Released  ID:", action.payload); 
        state.caught = state.caught.filter((p) => p._id !== action.payload);
      });
  },
});

export const { setPokemonList } = pokemonSlice.actions;
export default pokemonSlice.reducer;
