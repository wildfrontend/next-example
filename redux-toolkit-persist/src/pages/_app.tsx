import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "state/_store";

const NextApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  console.log("-----------------___APP", { pageProps });
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default NextApp;
