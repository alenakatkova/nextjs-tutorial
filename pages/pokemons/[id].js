import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ pokemon }) {
    return <Layout>
        <h2 className={utilStyles.headingLg}>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={'front image of ' + pokemon.name} />
        <img src={pokemon.sprites.back_default}  alt={'back image of ' + pokemon.name}/>
    </Layout>;
}

export async function getStaticPaths() {
    const pokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
        .then(response => response.json())
        .then(data => {
            return data.results
        });

     return {
         paths: pokemons.map(pokemon => {
                 return {
                     params: {
                         id: pokemon.name
                     }
                 }
         }),
         fallback: false
     }
}

export async function getStaticProps({ params }) {
    const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/' + params.id)
        .then(response => response.json());

    return {
        props: {
            pokemon
        },
    };
}