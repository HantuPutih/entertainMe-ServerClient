import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_MOVIES } from '../graphQL/index'
import ContentCard from '../components/ContentCard'
import Loading from '../components/Loading'
import Container from 'react-bootstrap/esm/Container'

function Movies() {
  const { loading, error, data } = useQuery(GET_MOVIES)

  useEffect(() => {
    return () => {
      console.log("cleaned up")
    }
  }, [])
  

  if (error) {
    return (
      <>
        <h1>{JSON.stringify(error)}</h1>
      </>
    )
  }
  return (
    <div className='wrap-container'>
      <Container fluid>
      <br/>
        <h1>Movie List</h1>
          <br/>
        <div className="row">
          {
            !loading ? data.movies.map(movie => {
              return <ContentCard content={movie} key={movie._id}/>
            })
            : <Loading/>
          }
        </div>
      </Container>
      
      
    </div>
  )
}

export default Movies
