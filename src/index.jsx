import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "app";
import Theme, { GlobalStyle } from "app/Theme";

import storeBuilder from "store";
import * as THEME from "store/theme";

function init() {
  const store = storeBuilder();
  store.dispatch(THEME.fromLocal);
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Theme>
          <>
            <BrowserRouter>
              <App />
            </BrowserRouter>
            <GlobalStyle />
          </>
        </Theme>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

if (IS_MOCKED) {
  // eslint-disable-next-line global-require
  const { worker } = require("mocks/browser");
  worker.start().then(() => init());
} else {
  init();
}
