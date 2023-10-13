import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Layout from "../components/Layout";

function AddRecipe({ addRecipe, submitFunc }) {
  const [recipeData, setRecipeData] = useState({
    imageUrl: "",
    name: "",
    steps: [{ id: uuidv4(), step: "" }],
  });
  const [formErrors, setFormErrors] = useState({
    imageUrl: "",
    name: "",
    steps: [""],
  });

  const handleChange = (e, index) => {
    const updatedSteps = [...recipeData.steps];
    updatedSteps[index].step = e.target.value;
    setRecipeData({ ...recipeData, steps: updatedSteps });
  };

  const handleAddStep = () => {
    setRecipeData({
      ...recipeData,
      steps: [...recipeData.steps, { id: uuidv4(), step: "" }],
    });
  };

  const handleRemoveStep = (index) => {
    const updatedSteps = [...recipeData.steps];
    updatedSteps.splice(index, 1);
    setRecipeData({ ...recipeData, steps: updatedSteps });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {
      imageUrl: "",
      name: "",
      steps: [],
    };

    if (!recipeData.imageUrl) {
      errors.imageUrl = "Image URL is required";
    }

    if (!recipeData.name) {
      errors.name = "Recipe Name is required";
    }

    recipeData.steps.forEach((step, index) => {
      if (!step.step) {
        errors.steps[index] = "Step cannot be empty";
      }
    });

    setFormErrors(errors);

    if (
      Object.keys(errors).length === 0 ||
      errors.steps.every((error) => error === "")
    ) {
      const cardId = uuidv4();

      addRecipe({ ...recipeData, id: cardId });

      const existingRecipeCards =
        JSON.parse(localStorage.getItem("recipeCards")) || [];

      existingRecipeCards.push({ ...recipeData, id: cardId });

      localStorage.setItem("recipeCards", JSON.stringify(existingRecipeCards));
      setRecipeData({
        imageUrl: "",
        name: "",
        steps: [{ id: uuidv4(), step: "" }],
      });
      submitFunc(false);
    }
  };

  return (
    <Layout title="addrecipe">
      <h1>About page</h1>
      <div className="add-recipe">
        <h2>Add Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={recipeData.imageUrl}
              onChange={(e) =>
                setRecipeData({ ...recipeData, imageUrl: e.target.value })
              }
            />
            <div className="error">{formErrors.imageUrl}</div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Recipe Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={recipeData.name}
              onChange={(e) =>
                setRecipeData({ ...recipeData, name: e.target.value })
              }
            />
            <div className="error">{formErrors.name}</div>
          </div>
          <div className="form-group">
            <label htmlFor="steps">Recipe Steps:</label>
            {recipeData.steps.map((step, index) => (
              <div key={step.id} className="step-input">
                <input
                  type="text"
                  id={`step-${index}`}
                  name={`step-${index}`}
                  value={step.step}
                  onChange={(e) => handleChange(e, index)}
                />
                <div className="error">{formErrors.steps[index]}</div>
                <div>
                  <button
                    className="plus"
                    type="button"
                    onClick={handleAddStep}
                  >
                    +
                  </button>
                  <button
                    className="minus"
                    type="button"
                    onClick={() => handleRemoveStep(index)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  );
}

export default AddRecipe;
