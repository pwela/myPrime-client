import React from "react";

import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";

//import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
//import "bootstrap/dist/css/bootstrap.min.css";

// Import statement to indicate that I need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyPrimeApplication = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

// finds the root of my app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tell React to render my app in the root DOM element
root.render(<MyPrimeApplication />);
