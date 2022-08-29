import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsHeadphones, BsStar, BsFillArrowUpRightSquareFill as ArrowLink} from 'react-icons/bs'

const Rec = ({results, artistName, loading}) =>{
  if(loading){
    return  (
    <div className='loadingPage'>
          <div>
            <BsHeadphones/>
          </div>
        <h2>Loading your recomendations...</h2>
    
    </div>
    );
  }else{
    return (
      results.map((result, index) => (
        <Card key={index} className="resultCard">
        <Card.Body>
          <Card.Title>{result.resultIndex}. {result.name}</Card.Title>
          <Card.Text>
            {result.bio}
          </Card.Text>
          <BsStar />
          <ArrowLink/>
        </Card.Body>
      </Card>
      ))
      
    )
  }
  
  
}
/*
<Card style={{width: "300px"}}>
      <Card.Img src={require("../../assets/test.jpg")} style={{height: "300px", width: "300px"}} />
      <Card.Body>
        <Card.Title>1. All Them Witches</Card.Title>
        <Card.Text>
          All Them Witches is an American rock band from Nashville, Tennessee. The band consists of drummer Robby Staebler, vocalist/multi-instrumentalist Charles Michael Parks Jr., guitarist Ben McLeod, and keyboardist/multi-instrumentalist Allan Van Cleave. Nashville, Tennessee, U.S. Charles Michael Parks Jr.
        </Card.Text>
        <BsStar />
      </Card.Body>
    </Card>


*/
export default Rec