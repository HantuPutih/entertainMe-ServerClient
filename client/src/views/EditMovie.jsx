import React, { useState, useEffect } from 'react'
import {FIND_ONE_MOVIE} from '../graphQL/index'
import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { Container, Form, Button,Badge } from 'react-bootstrap';
import { EDIT_MOVIE, GET_MOVIES } from '../graphQL/index'
import Loading from '../components/Loading'
import { useHistory } from "react-router-dom"
import Swal from 'sweetalert2'

function EditMovie() {
  const [editMovie] = useMutation(EDIT_MOVIE);
  let { id } = useParams()
  const { loading, error, data: dataFindOne } = useQuery(FIND_ONE_MOVIE, {variables: {id: id}});
  let history = useHistory()

  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [popularity, setPopularity] = useState(0)
  const [posterPath, setPosterPath] = useState('')
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState()


  function addToTags(e) {
    e.preventDefault()
    let flag = false
    for (let i = 0; i < tags.length; i++) {
      if (!tag) {
        flag = true
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'please fill the tag!',
        })
        break
      }
      if (tags[i] === tag) {
        flag = true
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
    if (!flag) {
      console.log(flag,'=-==================');
      setTags([...tags, tag])
      setTag('')
    }
  }
  const editBtn = (e) => {
    e.preventDefault()
    if (!title || !overview || !overview || !posterPath || tags.length ===0 ) {
      Swal.fire({
        icon: 'error',
        title: 'Please fill all the fields',
        text: 'Fields cannot be empty',
      })
    } else {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          editMovie({
            variables: {
              id: id,
              title: title,
              overview: overview,
              popularity: Number(popularity),
              poster_path: posterPath,
              tags: tags
            },
            refetchQueries: [{query: GET_MOVIES}]
          })
          history.push('/movie/' + dataFindOne.findOneMovie._id)
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          history.push('/movie')
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
  }

  const destroyTag = (el) => {
    let newTag = tags.filter(tag => 
      tag !==  el
    )
    setTags(newTag)
  }

  useEffect(() => {

    if(!loading) {
      setTitle(dataFindOne.findOneMovie.title)
      setOverview(dataFindOne.findOneMovie.overview)
      setPopularity(dataFindOne.findOneMovie.popularity)
      setPosterPath(dataFindOne.findOneMovie.poster_path)
      setTags(dataFindOne.findOneMovie.tags)
      // console.log(dataFindOne.findOneMovie);
    }
    return() => {
      console.log("cleaned up");
    };
  }, [dataFindOne,loading]);

  if (error) {
    return (
      <div>{JSON.stringify(error)}</div>
    )
  }


  return (
    <div>
      <Container className='container-add'>
        <br/>
        <h1>Edit Movie</h1>
        <br/>
        {
          !loading ?
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control value={title} type="text" placeholder="Enter Title" onChange={event => setTitle(event.target.value)} />
              <Form.Text className="text-muted">
                enter title for the movie
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Overview</Form.Label>
              <Form.Control min='0' value={overview} type="text" placeholder="Enter Overview" onChange={event => setOverview(event.target.value)}/>
              <Form.Text className="text-muted">
                enter overview for the movie
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Popularity</Form.Label>
              <Form.Control value={popularity} type="number" placeholder="Enter Popularity" onChange={event => setPopularity(event.target.value)} />
              <Form.Text className="text-muted">
                enter the popularity of the movie
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Poster Image</Form.Label>
              <Form.Control value={posterPath} type="text" placeholder="Enter url for movie poster" onChange={event => setPosterPath(event.target.value)}/>
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
                    X
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
            <Button variant="primary" onClick={editBtn}>
              Submit
            </Button>
          </Form>
          :
          <Loading/>
        }
      </Container>
    </div>
  )
}

export default EditMovie
