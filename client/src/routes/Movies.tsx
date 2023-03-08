import { useApolloClient,gql } from "@apollo/client";
import { useEffect, useState } from "react";

const Movies = () => {
    const [movies,setMovies] = useState<any[]>([]);
    const client = useApolloClient();
    useEffect(()=>{
        
        client.query({
            query:gql`
                {
                    allMovies{
                        title
                    }
                }
            `
        })
        .then((result) => setMovies(result.data.allMovies));
    },[client])
    return(
        <div>
            {movies.map(movie => (
                <li key = {movie.id}>{movie.title}</li>
            ))}
        </div>
    )
}

export default Movies;