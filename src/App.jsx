import React from "react";
import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Details from "./Details";

const App = () => {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">Adopt Me! </Link>
      </header>
      <Routes>
        <Route path="/" element={<SearchParams />} />
        <Route path="/details/:id/" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
