import { ApolloServer,gql} from "apollo-server";
import fetch from "node-fetch";
let tweets = [
    {
        id:"1",
        text:"hi",
        userId:"2"
    },
    {
        id:"2",
        text:"hello",
        userId:"1"
    },
];

let users = [
    {
        id:"1",
        firstName:"bk",
        lastName:"cho",
    },
    {
        id:"2",
        firstName:"sad",
        lastName:"too",
    }
]


const typeDefs = gql `
    type User{
        id:ID!
        username:String!
        firstName: String!
        lastName:String!
        fullName:String!
    }
    """
    Tweet object represents a resource for a Tweet
    """
    type Tweet{
        id:ID!
        text:String!
        author:User!
    }
    type Query{
        allMovies:[Movie!]!
        allUsers:[User!]!
        allTweets : [Tweet]
        Tweet(id:ID!) : Tweet  
        ping:String!
        movie(id:String!):Movie
    }
    type Mutation{
        postTweet(text:String!,userId:ID!):Tweet!
        deleteTweet(id:ID!):Boolean!
    }
    type Movie{
        id: Int!
        url: String!
        imdb_code: String!
        title: String!
        title_english: String!
        title_long: String!
        slug: String!
        year: Int!
        rating: Float!
        runtime: Float!
        genres: [String]!
        summary: String
        description_full: String!
        synopsis: String!
        yt_trailer_code: String!
        language: String!
        background_image: String!
        background_image_original: String!
        small_cover_image: String!
        medium_cover_image: String!
        large_cover_image: String!
    }
`;

const resolvers = {
    Query:{
        allTweets(){
            return tweets;
        },
        Tweet(root, {id}){
            console.log(id);
            return tweets.find((tweet) => tweet.id ===id);
        },
        allUsers(){
            return users;
        },
        allMovies(){
            console.log("hiyo");
            return fetch("https://yts.mx/api/v2/list_movies.json")
            .then(res => res.json())
            .then(json => json.data.movies);
        },
        async movie(_,{id}){
            console.log(id);
            const res = await fetch(`https://yts.mx/api/v2/list_movies.json?movie_id=${id}`)
            .then(res => res.json())
            .then(json => json.data[0]);
            
            console.log(res);
            return res;
        }
    },
    Mutation:{
        postTweet(_,{text,userId}){
            const newTweet = {
                id:tweets.length+1,
                text,
            }
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(_,{id}){
            const tweet = tweets.find((tweet) => tweet.id === id);
            if(!tweet) return false;
            tweets = tweets.filter( tweet => tweet.id !== id);
            return true;
        }
    },
    User:{
        fullName(root){
            return root.firstName + root.lastName
        }
    },
    Tweet:{
        author({userId}){
            return users.find(user => user.id === userId);
        }
    }
}
const server = new ApolloServer({typeDefs,resolvers});

server.listen().then(({url}) =>{
    console.log(`Running on ${url}`)
})