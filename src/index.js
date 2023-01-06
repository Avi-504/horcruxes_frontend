import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import App from "./App";
import "./index.css";
import reducers from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

//React 18 new rendering
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// React 17 and lower
//Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );
