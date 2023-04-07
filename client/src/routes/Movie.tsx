import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
        query getMovie($movieId:String!){
            movie(id:$movieId){
                id
                title
            }
        }
    `
const Movie = () =>{
    const {id} = useParams();
    const result = useQuery(GET_MOVIE,{
        variables:{
            movieId : id
        }
    });

    console.log(result)
    //console.log(data,loading)
    
    if(result.loading){
        return <h1>Fetching movie...</h1>
    }
    return <div>dsfsd</div>
}

export default Movie;