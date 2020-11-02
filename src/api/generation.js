// @flow
import axios from "axios";

import { BAD_REQUEST } from "api";

export type Pokemon = {
  name: string,
};

export async function byId(id: number): [Pokemon] {
  const { data, status } = await axios.get(
    `https://pokeapi.co/api/v2/generation/${id}`
  );
  if (status >= 400) {
    throw new Error(BAD_REQUEST);
  }

  return data.pokemon_species.map(({ name }) => ({
    name,
  }));
}
