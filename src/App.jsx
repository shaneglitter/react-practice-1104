
import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
   //我要一從"https://pokeapi.co/api/v2/pokemon?limit=20"拿出資料 
   useEffect(()=>{
    async function loadingPokemons(){try{
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
        if(!res.ok){
          throw new Error(`有問題${res.status}`);
          }
        const data = await res.json();
        const urls = data.results.map(async p=>{
          const res = await fetch(p.url);
          const imgurl = await res.json();
          return(imgurl)
        });
        const detail = await Promise.all(urls);
        setPokemons(detail);
        console.log(detail);
      } 
      catch(err){
       setError(err.message);
      }
      finally{
        setIsloading(false);
      }
    }
    loadingPokemons()
   },[]);
   if(isLoading){
    return(<p>載入中</p>)
   }
   if(error){
    return(<p>{error}</p>)
   }
   return(
    <ul>
     {pokemons.map(p=>
      <PokemonCard key={p.id} pokemon={p}/>
     )}
    </ul>
   );
   //如果有錯誤要拉出來另外print
   //在另外拿出image把資料改成detail，存在pokemons
   //利用react中的 props來把資料一層層逐個印出來
}

export default App;