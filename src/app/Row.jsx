// @flow
import React, { useCallback } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import type { Pokemon } from "api/generation";

export default function Row({ name }: Pokemon) {
  const history = useHistory();
  const onClick = useCallback(() => history.push(`/pokemon/${name}`), [
    history,
    name,
  ]);
  return (
    <Article
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
    >
      <ImgContainer>
        <Img src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${name}.gif`} alt={name} />
      </ImgContainer>
      <Name>{name}</Name>
    </Article>
  );
}

export const Article = styled.article`
  width: 33%;
  max-width: 550px;
  min-width: 350px;
  height: 350px;
  margin: 1vh 1%;
  background: ${({ theme }) => theme.card.bg};
  border-radius: 5px;
  border: ${({ theme }) => theme.card.border} solid 1px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.card.hover};
  }
`;

const ImgContainer = styled.div`
  height: 250px;
  width: 100%;
`;

const Img = styled.img`
  margin-top: 50px;
  height: 200px;
`;

const Name = styled.h2`
  text-transform: capitalize;
  font-weight: bold;
  margin-top: 40px;
`;
