
function PokemonCard({pokemon}){
    return(
        <li>
            <img src={pokemon.sprites.front_default} alt={pokemon.id}/>
            {pokemon.name}
        </li>
    )

}export default PokemonCard