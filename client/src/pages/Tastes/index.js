import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { removeTasteId } from '../../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { REMOVE_TASTE } from '../../utils/mutations';
import {BsHeadphones} from 'react-icons/bs'
import {  BsFillArrowUpRightSquareFill as ArrowLink } from 'react-icons/bs';
import {Link} from 'react-router-dom';

const Tastes = () => {

  const { loading, data } =  useQuery(GET_ME)
  const userData = data?.me;

  

  const [removeTaste] = useMutation(REMOVE_TASTE);


  const handleDeleteTaste = async (artistId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeTaste({
        variables: {artistId}
      });


      removeTasteId(artistId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }
  console.log(userData.tastes)
  if(userData.tastes.length === 0){
    return (
      userData.tastes.map((result, index) => (
        <Card key={index} className="resultCard" >
          <Card.Body className='resultBody'>
            
            <div className='artistImageWrapper'>
              <img src={result.image} className="artistImage" alt={result.artist}></img>
            </div>
              
            <div className='artistBioWrapper'>
              <Card.Title>{result.artist}</Card.Title>
                <Card.Text>
                  {result.bio}
                </Card.Text>
              <div className='cardLinks'>
                      <Button className='btn-block btn-danger' onClick={() => handleDeleteTaste(result.artistId)}>
                      Remove Artist
                    </Button>
               
                  <a href={result.link} target="_blank" rel="noopener noreferrer" className='OpenLastFM' title="view artist on lastFM">
                    <ArrowLink className='toLastFM' href={result.link} />
                  </a>
              </div>
            </div>
  
  
  
          </Card.Body>
        </Card>
      ))
    );
  }else{
    return (
      <div className='noTastes'>
        <div className='noTasteContent'>
          <h1>No tastes saved yet!</h1>
          <h1 className='tasteHeadphones'><BsHeadphones/></h1>
          <Button as={Link} to='/' variant="dark">Back to Search</Button>
        </div>
      </div>
    )
  }
  
  
};

export default Tastes;