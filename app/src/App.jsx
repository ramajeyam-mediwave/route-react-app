//final
import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
const AddRecipe = lazy(() => import("./pages/Addrecipe"));
function App() {
  const [recipes, setRecipes] = useState(getFromStorage());
  const [showAddRecipe, setShowAddRecipe] = useState(false);

  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  function getFromStorage() {
    const savedValues = localStorage.getItem("recipeCards");
    if (savedValues) {
      const storedTitles = JSON.parse(savedValues);
      return storedTitles;
    }
    return [];
  }
  function submitFunc(boolean) {
    setShowAddRecipe(boolean);
  }

  function Loading() {
    return <p>Loading ...</p>;
  }
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddRecipe />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
