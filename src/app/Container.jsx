import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import shallowequal from "shallowequal";

import styled from "styled-components";

import { byId } from "api/generation";

import Row, { Article } from "app/Row";

import { getGeneration } from "store/generation";

import logo from "img/pokemon-logo.png";

export default function Container() {
  // Input filter query
  const [query, setQuery] = useState(new RegExp());
  const { on, response, error } = useSelector(
    ({ generation }) => generation,
    shallowequal
  );

  const dispatch = useDispatch();
  // On mount effect
  useEffect(() => {
    if (!response) {
      dispatch(getGeneration(byId(1)));
    }
  }, [dispatch, response]);

  return (
    <Main>
      <Section>
        <Logo src={logo} />
        <Title>Generation 1</Title>
        <SubTitle>{response ? response.length : 0} pokemons</SubTitle>
        <Input
          onChange={({ target }) => {
            const { value } = target;
            if (/^[\w -]*$/.test(value)) {
              setQuery(new RegExp(value, "i"));
            }
          }}
        />
      </Section>
      <Section>
        <Table>
          {response &&
            response
              .filter(({ name }) => query.test(name))
              .map((data) => <Row {...data} key={data.name} />)}
          {on && <Article>Loading...</Article>}
          {error && <ArticleWarning>{error}</ArticleWarning>}
        </Table>
      </Section>
    </Main>
  );
}

const Logo = styled.img.attrs({ alt: "logo" })`
  max-width: 80%;
`;

const Input = styled.input.attrs({ type: "text", placeholder: "Search" })`
  height: 2vh;
  min-height: 20px;
  width: 20%;
  min-width: 350px;
  margin-top: 1vh;
  appearance: searchfield;
`;

const Table = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1920px;
  min-width: 80%;
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;

const ArticleWarning = styled(Article)`
  background: red;
`;

const Title = styled.h2`
  margin-bottom: 0;
`;

const SubTitle = styled.h3`
  margin-top: 0.2rem;
  margin-bottom: 0;
`;

const Main = styled.main`
  background-color: ${({ theme }) => theme.bg};
  min-height: 100vh;
`;
