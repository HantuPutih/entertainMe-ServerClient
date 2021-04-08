import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Loading from '../components/Loading';
import { ENTERTAIN_ME } from '../graphQL/index'
import ContentCard from '../components/ContentCard'

function Home() {
  useEffect(() => {
    return () => {
      console.log("cleaned up");
    }
  }, [])
  const { loading, error, data } = useQuery(ENTERTAIN_ME);
  if (error) {
    return (
      <>
        <h1>{JSON.stringify(error)}</h1>
      </>
    )
  }
  
  

  return (
    <div>
      <Container fluid>
        <br/>
        <h1> Entertain ME <a href="#movies"> Movies</a> and <a href="#TVSeries">TV Series</a> </h1>
        <br/>
        {
          !loading ?
          <>
            <h2 id="movies" >Movies List</h2>
            <br/>
            <div className="row">
              {
                data.movies.map(movie => 
                  <ContentCard content={movie} key={movie._id}/>                
                )
              }
            </div>
            <hr/>
            <br/>
            <h2 id='TVSeries'>TV Series List</h2>
            <br/>
            <div className="row">
              {
                data.TVSeries.map(series => 
                  <ContentCard content={series} key={series._id}/>                
                )
              } 
            </div>
          </>
          : <Loading></Loading>
        }
        
      </Container>
      
    </div>
  )
}

export default Home
