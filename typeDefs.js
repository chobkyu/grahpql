import { gql} from "apollo-server";

export const typeDefs = gql `
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
    }
    type Mutation{
        postTweet(text:String!,userId:ID!):Tweet!
        deleteTweet(id:ID!):Boolean!
    }
`;