import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    if (!search) return alert("Please enter a recipe name!");

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
    const data = await response.json();
    setRecipes(data.meals || []);
  };

  return (
    <div className="app">
      <h1>🍴 Recipe Ideas Finder</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-card">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h3>{recipe.strMeal}</h3>
              <p>
                {recipe.strArea} • {recipe.strCategory}
              </p>
              <a
                href={recipe.strSource || recipe.strYoutube}
                target="_blank"
                rel="noreferrer"
              >
                View Recipe
              </a>
            </div>
          ))
        ) : (
          <p className="no-results">No recipes found. Try searching above!</p>
        )}
      </div>
    </div>
  );
}
