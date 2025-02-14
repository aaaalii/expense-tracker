import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import { persistor, store } from "./store";
import { PersistGate } from 'redux-persist/integration/react';
import { enableMapSet } from "immer";

enableMapSet();
const root = document.getElementById('root');

createRoot(root).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <div className="bg-dark text-light">
        <App/>
      </div>
    </PersistGate>
  </Provider>
);