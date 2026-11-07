
import { useState, useEffect } from "react";
import  PokemonCard  from "./PokemonCard";
 
function App() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadingPokemon() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        if (!res.ok) {
          throw new Error(`載入失敗${res.status}`);
        }
        const data = await res.json()
        const image = data.results.map(async p=> {
            const respond = await fetch(p.url);
            return await respond.json()});
        const details = await Promise.all(image);    
        setPokemons(details);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsloading(false);
      }
    }

    loadingPokemon();
  }, []);

  if (isLoading) {
    return <p>載入中...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ul>
   {pokemons.map(p => (
        <PokemonCard key={p.id} pokemon={p} />
      ))
    }
    </ul>
    );
}

export default App;