import { gql } from '@apollo/client';

//movie
export const GET_MOVIES = gql`
  query Movies {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  } 
`

export const FIND_ONE_MOVIE = gql`
  query findOne($id: ID!) {
    findOneMovie(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const DESTROY_MOVIE = gql`
  mutation destroyMovie($id: ID!) {
    destroyMovie(id: $id) {
      message
    }
  }
`

export const EDIT_MOVIE = gql`
    mutation putMovie ($id: ID!, 
      $title: String,
      $overview: String,
      $poster_path: String,
      $popularity: Float
      $tags: [String]
    ){
    putMovie (id: $id, movie: {
      title: $title,
      overview: $overview,
      poster_path: $poster_path,
      popularity: $popularity
      tags: $tags
    })  {
      message
    }
  }
`

// mutation addMovie (
//   $title: String,
//   $overview: String,
//   $poster_path: String,
//   $popularity: Float
//   $tags: [String]
// ){
// addMovies(movie: {
//   title: $title,
//   overview: $overview,
//   poster_path: $poster_path,
//   popularity: $popularity
//   tags: $tags
// }) {
//   _id
//   title
//   overview
//   popularity
//   poster_path
//   tags
// }
// }

// mutation addMovies ($input: inputData){
//   addMovies(movie: $input) {
//     _id
//     title
//     overview
//     popularity
//     poster_path
//     tags
//   }
// }
// `

export const ADD_MOVIE = gql`
    mutation addMovie (
      $title: String,
      $overview: String,
      $poster_path: String,
      $popularity: Float
      $tags: [String]
    ){
    addMovies(movie: {
      title: $title,
      overview: $overview,
      poster_path: $poster_path,
      popularity: $popularity
      tags: $tags
    }) {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`

//fetch from home
export const ENTERTAIN_ME = gql`
  query EntertainMe {
    movies {
      _id
      title
      overview
      popularity
      poster_path
      tags
    },
    TVSeries {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`

//series
export const GET_TVSERIES = gql`
  query TVSeries {
    TVSeries {
      _id
      title
      overview
      popularity
      poster_path
      tags
    }
  }
`

//favorites
export const GET_FAVORITES = gql`
  query GetFavorites {
    favorites @client
  }
`