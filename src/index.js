import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const rootEl = document.getElementById('app-site');

// Create a reusable render method that we can call more than once
let render = () => {
  // Dynamically import our main App component, and render it
  const MainApp = require('./MainApp').default;
  ReactDOM.render(
    <>
      <MainApp/>
      <ToastContainer/>
      </>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./MainApp', () => {
    const MainApp = require('./MainApp').default;
    render(
      <>
      <MainApp/>
      <ToastContainer/>,
      </>,
      rootEl
    );
  });
}

render();
