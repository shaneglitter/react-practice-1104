import { useState } from "react";
import { useEffect } from "react";
function App(){
  const [pokemons, setPokemons] =useState([]);
  const [isLoading, setIsloading] =useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    
    async function loadingPokemon(){
      try{ const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        if(!res.ok){
        throw new Error(`載入失敗${res.status}`);  
        }
      const data = await res.json();
      setPokemons(data.results);
      }catch(err){
        console.log(err.message)
        setError(err.message)
      }finally{
        setIsloading(false);
      }
      
    }
    
    loadingPokemon();
  },[])
  if(isLoading){
    return(<p>載入中...</p>)
  }
  if(error){
      
      return(<p>{error}</p>)
    }

  return(
    <ul>
      {pokemons.map(re=><li key = {re.name}>{re.name}</li>)}
    </ul>
  )
  
}
export default App



import { useState, useEffect } from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadingPokemon() {
      try {
        // 1. 抓列表
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        if (!res.ok) {
          throw new Error(`載入失敗${res.status}`);
        }
        const data = await res.json();

        // 2. 每一隻都去點餐，拿到 20 張號碼牌
        const promises = data.results.map(async p => {
          const r = await fetch(p.url);
          return await r.json();
        });

        // 3. 等 20 份餐全部好了，一次領出來
        const details = await Promise.all(promises);

        // 4. 存起來
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
        <li key={p.id}>
          <img src={p.____.____} alt={p.name} />
          {p.name}
        </li>
      ))}
    </ul>
  );
}

export default App;