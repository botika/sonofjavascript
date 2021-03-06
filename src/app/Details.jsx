// @flow
import React, { useCallback } from "react";
import { useHistory, useParams } from "react-router";

import styled from "styled-components";
import { byName, PokemonDetails } from "api/pokemonDetails";
import { useQuery } from "react-query";

export default function Details() {
  const { name } = useParams();
  const history = useHistory();
  const onClick = useCallback(() => history.push("/"), [history]);
  const { data, isLoading, error } = useQuery(`details-${name}`, () =>
    byName(name)
  );

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error.message}</div>;

  const {
    abilities,
    height,
    id,
    name: pokemonName,
    types,
  }: PokemonDetails = data;
  return (
    <MainCard>
      <Card>
        <Close
          onClick={(event) => {
            event.preventDefault();
            onClick();
          }}
        >
          x
        </Close>
        <ImgContainer>
          <Image
            src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${name}.gif`}
            alt={name}
          />
        </ImgContainer>
        <Name>{pokemonName}</Name>
        <DetailBox>
          <p>
            <b>ID:</b> {id}
          </p>
          <PList>
            <b>Types:</b>
          </PList>
          <List>
            {types.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </List>
          <p>
            <b>Height:</b> {height}
          </p>
          <PList>
            <b>Abilities:</b>
          </PList>
          <List>
            {abilities.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </List>
        </DetailBox>
      </Card>
    </MainCard>
  );
}

const PList = styled.p`
  margin-bottom: 0;
`;

const List = styled.ul`
  margin: 0;
`;

const DetailBox = styled.div`
  margin: 0 5% 2vh 5%;
  text-align: left;
`;

const Close = styled.span`
  position: absolute;
  top: 5px;
  right: 15px;
  font-size: 150%;
  font-weight: bold;
  cursor: pointer;
  color: black;
  &:hover {
    color: gray;
  }
`;

const Name = styled.h2`
  text-align: center;
  text-transform: capitalize;
  font-weight: bold;
  margin-bottom: 0;
`;

const Image = styled.img`
  height: 200px;
  margin: 25px auto;
`;

const ImgContainer = styled.div`
  text-align: center;
  height: 250px;
  width: 100%;
`;

const MainCard = styled.div`
  font-size: x-large;
  display: block;
  background-color: ${({ theme }) => theme.bg};
  min-height: 85vh;
  padding-top: 15vh;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 700px;
  width: 80%;
  min-width: 400px;
  background-color: ${({ theme }) => theme.card.bg};
  border: ${({ theme }) => theme.card.border} solid 1px;
`;
