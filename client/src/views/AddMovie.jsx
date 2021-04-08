import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container, Badge } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { ADD_MOVIE, GET_MOVIES } from '../graphQL/index'
import { useHistory } from "react-router-dom"
import Swal from 'sweetalert2'

function AddMovie() {
  const [addMovies] = useMutation(ADD_MOVIE);
  let history = useHistory()

  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [popularity, setPopularity] = useState(0)
  const [posterPath, setPosterPath] = useState('')
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])

  function addToTags(e) {
    e.preventDefault()
    let flag = true
    for (let i = 0; i < tags.length; i++) {
      if (!tag) {
        flag = false
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'please fill the tag!',
        })
        break
      }
      if (tags[i] === tag) {
        flag = false
        console.log('duplicate tag!')
        setTag('')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tag already in exist!',
        })
        break
      } 
    }

    if (flag) {
      // console.log(flag,'=-==================');
      if (!tag) {
        flag = true
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'please fill the tag!',
        })
      } else {

        setTags([...tags, tag])
        setTag('')
      }
    }
  }
  const destroyTag = (el) => {
    let newTag = tags.filter(tag => 
      tag !==  el
    )
    setTags(newTag)
  }

  const addBtn = (e) => {
    e.preventDefault()
    if (!title || !overview || !popularity || !posterPath || tags.length ===0 ) {
      Swal.fire({
        icon: 'error',
        title: 'Please fill all the fields',
        text: 'Fields cannot be empty',
      })
    } else {
      addMovies({
        variables: {
          title: title,
          overview: overview,
          popularity: Number(popularity),
          poster_path: posterPath,
          tags: tags
        },
        refetchQueries: [{query: GET_MOVIES}]
      })
      Swal.fire('movie added')
      history.push('/movie')
    }
    
  }

  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, [])

  return (
    <div>
      <br/>
      <Container className='container-add'>
        <h1>Add New Movies</h1>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Title" onChange={event => setTitle(event.target.value)} />
            <Form.Text className="text-muted">
              enter title for the movie
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Overview</Form.Label>
            <Form.Control type="text" placeholder="Enter Overview" onChange={event => setOverview(event.target.value)}/>
            <Form.Text className="text-muted">
              enter overview for the movie
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Popularity</Form.Label>
            <Form.Control min='0' type="number" placeholder="Enter Popularity" onChange={event => setPopularity(event.target.value)} />
            <Form.Text className="text-muted">
              enter the popularity of the movie
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Poster Image</Form.Label>
            <Form.Control type="text" placeholder="Enter url for movie poster" onChange={event => setPosterPath(event.target.value)}/>
            <Form.Text className="text-muted">
              enter poster URL for the movie
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Add Tags</Form.Label>
            <Form.Control type="text" placeholder="Add Tags" onChange={event => setTag(event.target.value)} value={tag}/> 
            <ul className='uliuli-container'>
                {tags.map((el, idx)=> 
                  {
                    return <li key={idx}> <Badge variant="info" >{el} <Button onClick={() => destroyTag(el)} variant="info" size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    </Button></Badge></li>
                  })}
            </ul>
            <br/>
            <br/>
          </Form.Group>
          <Button variant="success" onClick={addToTags}>
            add Tag
          </Button>
            <br/>
            <br/>
          <Button variant="primary" onClick={addBtn}>
            Submit
          </Button>
        </Form>
      </Container>
      
    </div>
  )
}

export default AddMovie
