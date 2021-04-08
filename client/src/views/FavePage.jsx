import React, { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { favoriteVar } from '../graphQL/var'
import ContentCard from '../components/ContentCard'
import { Container } from 'react-bootstrap'


function FavePage() {
  const favorites = useReactiveVar(favoriteVar)
  useEffect(() => {
    return () => {
      console.log("cleaned up");
    }
  }, [])
  return (
    <div className='fav-container'>
      <br/>
      <h2>User's Favorites <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-star" viewBox="0 0 16 16">
        <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z"/>
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
      </svg></h2>
      <br/>

    <Container>
        {
          favorites.length !== 0
          ?
            <div className='row'>
              {
                favorites.map(fav => 
                  <ContentCard content={fav} key={fav._id}/>                
                )
              } 
            </div>
          :
          <h5 className='text-center text-muted'>Favorites is empty</h5>
        }
      </Container>
      <br/>
    </div>
  )
}

export default FavePage
