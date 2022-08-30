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

    type Auth {
        token: ID!
        user: User
    }

    input SavedTasteInput {
        artist: String
        bio: String
        link: String
        image: String
        artistId: String

    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveTaste(input: SavedTasteInput): User
        removeTaste(artistId: String!): User
}
`;

// export the typeDefs
module.exports = typeDefs;