const { gql } = require('apollo-server-express');

// typeDefs
const typeDefs = gql`
    type Taste {
        _id: ID
        artistId: String
        artist: String
        image: String
        bio: String
        link: String
        logo: String
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
        artistId: String
        artist: String
        bio: String
        image: String
        link: String
        logo: String

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