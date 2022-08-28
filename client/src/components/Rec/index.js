import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsStar } from 'react-icons/bs'

function Rec() {
  return (
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

  )
}

export default Rec