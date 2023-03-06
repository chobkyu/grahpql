import { ApolloServer,gql} from "apollo-server";

const tweets = [
    {
        id:"1",
        text:"hi",
    },
    {
        id:"1",
        text:"hello",
    },
]


const typeDefs = gql `
    type User{
        id:ID!
        username:String!
        firstName: String!
        lastName:String!
    }
    type Tweet{
        id:ID!
        text:String!
        author:User!
    }
    type Query{
        allTweets : [Tweet]
        Tweet(id:ID!) : Tweet  
        ping:String!
    }
    type Mutation{
        postTweet(text:String!,userId:ID!):Tweet!
        deleteTweet(id:ID!):Boolean!
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
        }
    }
}
const server = new ApolloServer({typeDefs,resolvers});

server.listen().then(({url}) =>{
    console.log(`Running on ${url}`)
})