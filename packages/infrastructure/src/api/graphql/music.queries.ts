import { gql } from "@apollo/client"

export const RANDOM_TRACKS = gql`
  query RandomTracks {
    randomTracks {
      artist {
        name
        picture
      }
      id
      preview
      title
      duration
      album {
        cover
        title
      }
    }
  }
`
