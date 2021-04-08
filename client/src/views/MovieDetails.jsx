import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import { useHistory } from "react-router-dom"
import { useMutation, useQuery } from '@apollo/client'
import { DESTROY_MOVIE, GET_MOVIES, FIND_ONE_MOVIE } from '../graphQL/index'
import { favoriteVar } from '../graphQL/var'
import Swal from 'sweetalert2'

function MovieDetails() {
  let history = useHistory()
  let { id } = useParams()
  const [destroyMovieMutation] = useMutation(DESTROY_MOVIE);
  const { loading, error, data } = useQuery(FIND_ONE_MOVIE, {variables: {id: id}});

  const onEdit = (e) => {
    e.preventDefault()
    history.push("/movie/edit/" + data.findOneMovie._id)
  }
  const onDestroy = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        history.push('/movie')
        destroyMovieMutation({
          variables: {id: data.findOneMovie._id},
          refetchQueries: [{query: GET_MOVIES}]
        })
        Swal.fire(
          'Deleted!',
          'Movie has been deleted.',
          'success'
        )
      }
    })
  }
  const onAddFav = (e) => {
    e.preventDefault()
    const existingFav = favoriteVar()
    const newFav = {
      _id: data.findOneMovie._id,
      title: data.findOneMovie.title,
      overview: data.findOneMovie.overview,
      poster_path: data.findOneMovie.poster_path,
      popularity: data.findOneMovie.popularity,
      tags: data.findOneMovie.tags
    }
    let flag = false
    for (let i = 0; i < existingFav.length; i++) {
      if (existingFav[i]._id === data.findOneMovie._id) {
        flag = true
        console.log('duplicate Favorites!')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Item already in Favorites!',
        })
        break
      } 
    }
    if (!flag) {
      favoriteVar([newFav, ...existingFav])
      Swal.fire('Added to Favorites')
    }
  }

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
    <>
    <Container className='container-details'>
      <br/>
      <h1>Movie Details</h1>
      <br/>
      {
        !loading ?
        <CardDeck>
        <Card border="dark">
          <div className="container-card">
            <Card.Img 
              variant="top" src={data.findOneMovie.poster_path}
              style={{
                objectFit: 'cover',
                width: '30%',
                height: '100%'
              }}
            />
            <div className="card-body-container">
              <Card.Body>
                <div className="card-body-inside">
                  <h2>Title: {data.findOneMovie.title}</h2>
                  <Card.Text>
                    <b> overview: </b> {data.findOneMovie.overview}
                  </Card.Text>
                  <Card.Text>
                    <b> popularity: </b>{data.findOneMovie.popularity}
                  </Card.Text>
                  <Card.Text>
                    <b> Tags: </b>
                  </Card.Text>
                      <ul>
                        {data.findOneMovie.tags.map((el, i)=> {
                          return <li  key={i}> <Badge variant="info"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tags" viewBox="0 0 16 16">
                          <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                          <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
                        </svg> {el}</Badge> </li>
                        })}

                      </ul>
                </div>
                <hr/>
                {/* <br/> */}
                <div className='button-wrapper'>
                  <Button className="mt-2" onClick={onAddFav} variant='primary'>Add to Favorites</Button>{' '}
                  <Button className="mt-2" onClick={onEdit} variant='warning'>Edit Movie</Button>{' '}
                  <Button className="mt-2" onClick={onDestroy} variant='danger'>delete movie</Button>{' '}
                </div>
              </Card.Body>
            </div>
          </div>
        </Card>
      </CardDeck>
      : null
      }
    </Container>
      
    </>
  )
}

export default MovieDetails
