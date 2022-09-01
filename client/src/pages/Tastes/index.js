import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { removeTasteId } from '../../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { REMOVE_TASTE } from '../../utils/mutations';
import { BsStar, BsFillArrowUpRightSquareFill as ArrowLink } from 'react-icons/bs'

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
  return (
    userData.tastes.map((result, index) => (
      <Card key={index} className="resultCard" >
        <Card.Body className='resultBody'>
          
          <div className='artistImageWrapper'>
            <img src={result.image} className="artistImage" alt={result.name}></img>
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
};
/*

 

<Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>


      
*/
export default Tastes;