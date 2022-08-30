import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsHeadphones, BsStar, BsFillArrowUpRightSquareFill as ArrowLink } from 'react-icons/bs'

const Rec = ({ results, loading }) => {
  if (loading) {
    return (
      <div className='loadingPage'>

        <div className="loader"></div>


        <h2 className='textLoader'>Loading your recomendations</h2>

      </div>
    );
  } else {
    return (
      results.map((result, index) => (
        <Card key={index} className="resultCard">
          <Card.Body className='resultBody'>
            
            <div className="artistImageWrapper">
              <img src={result.image} className="artistImage" alt={result.name}></img>
            </div>

            <div className='artistBioWrapper'>
              <Card.Title>{result.resultIndex}. {result.name}</Card.Title>
              <Card.Text>
                {result.bio}
              </Card.Text>
              <div className='cardLinks'>
                <BsStar className="favoriteArtist" title='favorite artist' />
                <a href={result.link} target="_blank" rel="noopener noreferrer" className='OpenLastFM' title="view artist on lastFM">
                  <ArrowLink className='toLastFM' href={result.link} />
                </a>
              </div>
            </div>



          </Card.Body>
        </Card>
      ))

    )
  }


}

export default Rec