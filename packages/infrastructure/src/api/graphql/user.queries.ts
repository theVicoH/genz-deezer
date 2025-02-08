import { gql } from "@apollo/client"

export const GET_ME = gql`
  query Me {
    me {
      email
    }
  }
`

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($email: String!) {
    updateProfile(email: $email) {
      id
      email
      createdAt
    }
  }
`
