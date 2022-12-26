
import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      tasteCount
      tastes {
        _id
        artist
        bio
        image
        link
        logo
      }
    }
  }
`;