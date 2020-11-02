import { rest } from "msw";

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get("https://pokeapi.co/api/v2/generation/:id", (req, res, ctx) => {
    const { id } = req.params;
    // eslint-disable-next-line global-require
    const generation1 = require("../fixtures/generation1.json");
    generation1.id = id;

    return res(ctx.json(generation1));
  }),

  rest.get("https://pokeapi.co/api/v2/pokemon/:name", (req, res, ctx) => {
    const { name } = req.params;
    // eslint-disable-next-line global-require
    const pokemon = require("../fixtures/pokemonDetails.json");
    pokemon.name = name;
    return res(ctx.json(pokemon));
  }),
];
