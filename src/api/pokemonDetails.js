// @flow
// Default bad response message
import axios from "axios";

import { BAD_REQUEST } from "api";

export type PokemonDetails = {
  id: number,
  name: string,
  types: [string],
  height: number,
  abilities: [string],
};

export async function byName(name: string): PokemonDetails {
  const { data, status } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );
  if (status >= 400) {
    throw new Error(BAD_REQUEST);
  }

  return {
    id: data.id,
    name: data.name,
    height: data.height,
    types: data.types.map(({ type }) => type.name),
    abilities: data.abilities.map(({ ability }) => ability.name),
  };
}
