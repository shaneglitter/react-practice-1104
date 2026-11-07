
function PokemonCard({pokemon}){
    return(
    <il>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        {pokemon.name}
    </il>);
}

export default PokemonCard;