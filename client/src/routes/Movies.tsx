import { useApolloClient,gql,useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const ALL_MOVIES = gql` 
        query getMovies
           {
            allMovies{
                title
                id
            }
           allTweets{
                id
                text
                author{
                    fullName
                }
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
    }
    
    return (
        <ul>
            <h1>movies</h1>
            {data.allMovies.map((movie:movie)=>
                <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>
                        {movie.title}
                    </Link>
                </li>
            )}
            <h1>tweets</h1>
                {data.allTweets.map((tweet:any)=>
                    <li key={tweet.id}>
                        
                    </li>
                )}
            </ul>
        )
        
       
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