import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_TASTE = gql`
  mutation saveTaste($input: tasteData!) {
    saveTaste(input: $input) {
      _id
      username
      email
      tastes {
        _id
        artistId
        artist
        bio
        image
        link
        logo
      }
    }
  }
`;

export const REMOVE_TASTE = gql`
  mutation Mutation($artistId: ID!) {
    removeTaste(artistId: $artistId) {
      _id
      username
      email
      tasteCount
      tastes {
        _id
        artistId
        artist
        bio
        image
        link
        logo
      }
    }
  }
`;