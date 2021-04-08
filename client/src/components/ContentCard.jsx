import React from 'react'
import Card from 'react-bootstrap/Card'
import { useHistory } from "react-router-dom"
import { useLocation } from "react-router-dom";

function ContentCard({content}) {

  let location = useLocation()
  let history = useHistory()

  const onDetails = (e) => {
    e.preventDefault()
    history.push("/movie/" + content._id)
  }

  return (
    <div className='col-lg-3 col-sm-4 justify-content-start'>
      {
        content ?
          <Card onClick={ location.pathname !== "/tvseries" && content.__typename !== "TVSeries" ? onDetails : null} style={ location.pathname !== "/tvseries" && content.__typename !== "TVSeries" ?
            { width: '18rem', minHeight: '30.5rem', maxHeight: '40.5rem', cursor: 'pointer'} :  { width: '18rem', minHeight: '30.5rem', maxHeight: '40.5rem'}
          } className='mx-auto mb-5' border="dark">
            <Card.Img style={{
              objectFit: 'cover',
              width: '100%',
              height: '50vh'
            }} variant="top" src={content.poster_path}/>
            <Card.Body className={'bg-dark'} >
              <Card.Title className={'text-white'}>{content.title}</Card.Title>
              <Card.Text className={'text-white'}>
                popularity: {content.popularity}
              </Card.Text>
            </Card.Body>
          </Card>
      : null
      }
    </div>
  )
}

export default ContentCard
