import React from "react";

import { useSelector } from "react-redux";
import shallowEqual from "shallowequal";

import { createGlobalStyle, ThemeProvider } from "styled-components";

export const DEFAULT = {
  card: { bg: "white", border: "black", hover: "#e2e2e2" },
  bg: "#f3f0f1",
  color: "#4c4847",
};
// TODO:
const light = {
  card: { bg: "white", border: "black", hover: "#e2e2e2" },
  bg: "lightgray",
  color: "#4c4847",
};

const themes = {
  default: DEFAULT,
  light,
};

type Props = {
  children: any,
};

export default function Theme({ children }: Props) {
  const theme = useSelector((state) => state.theme, shallowEqual);

  return <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>;
}

export const GlobalStyle = createGlobalStyle`
body {
color: ${({ theme }) => theme.color}
}
    `;
