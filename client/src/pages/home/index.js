import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {BsSearch, BsHeadphones} from 'react-icons/bs'

function Home() {
    return (
        <div className="homePage" style={{display:"flex"}}>
            <div className='TitleWrapper'>
                <h3>Tastemakr</h3>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="enter an artist"
                        aria-label="enter an artist"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                      <BsSearch/>
                    </Button>
                </InputGroup>
            </div>
            
        </div>
    )
}

export default Home