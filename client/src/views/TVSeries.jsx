import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_TVSERIES } from '../graphQL/index'
import ContentCard from '../components/ContentCard';
import Loading from '../components/Loading';
import Container from 'react-bootstrap/esm/Container';

function TVSeries() {
  const { loading, error, data } = useQuery(GET_TVSERIES);
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
      <h1>TV Series List</h1>
      <br/>
        {
          ! loading ?
          <div className="row">

            {
              data.TVSeries.map(series => 
                <ContentCard content={series} key={series._id}/>
              )
            }
          </div>
          : <Loading/>
        }
      </Container>
    </div>
  )
}

export default TVSeries
