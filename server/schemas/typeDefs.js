const { gql } = require('apollo-server-express');

// typeDefs
const typeDefs = gql`
    type Taste {
        _id: ID
        artist: String
        bio: String
        link: String
        image: String
        artistId: String
    }

    type User {
        _id: ID
        username: String
        email: String
        tasteCount: Int
        tastes: [Taste]        
    }

    type Query {
        me: User
    }

   
    input tasteData {
        artist: String
        bio: String
        link: String
        image: String
        artistId: String

    }
    type Auth {
        token: ID!
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveTaste(input: tasteData!): User
        removeTaste(artistId: ID!): User
    }
     

`;

// export the typeDefs
module.exports = typeDefs;