import { useApolloClient,gql,useQuery } from "@apollo/client";

const ALL_MOVIES = gql` 
        query getMovies
           {
            allMovies{
                title
                id
            }
           
        }
    `

interface movie{
    id:number,
    title:string
}
const Movies = () => {
    const {data, loading,error} = useQuery(ALL_MOVIES);
    console.log(data);
    if(loading){
        return <h1>Loading..</h1>
    }

    if(error){
        return <h1>Could not fetch</h1>
    }else{
        return <ul>
        {data.allMovies.map((movie:movie)=>
            <li key={movie.id}>{movie.title}</li>
        )}
    </ul>
    }
   
    // const client = useApolloClient();

    // useEffect(()=>{
        
    //     client.query({
    //         query:gql`
    //         {
    //             allMovies{
    //                 title
    //             }
    //         }`
    //     })
    //     .then((results) => console.log(results))
    // },[])
}

export default Movies;