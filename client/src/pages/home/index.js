import {useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {BsSearch, BsHeadphones} from 'react-icons/bs'

const fmKey = "2097d3a5f8da51f146d0e4e47efde651";

function Home() {
    const inputRef = useRef(null);

    function handleClick() {
        const artist = inputRef.current.value;
        
        fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=' + artist + '&api_key=' + fmKey + '&format=json')
            .then((response) => response.json())
            .then((json) => console.log(json))
    }
    
    return (
        <div className="homePage" style={{display:"flex"}}>
            <div className='TitleWrapper'>
                <h3>Tastemakr</h3>
                <InputGroup className="mb-3">
                    <Form.Control
                        ref={inputRef}
                        placeholder="enter an artist"
                        aria-label="enter an artist"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={handleClick}>
                      <BsSearch/>
                    </Button>
                </InputGroup>
            </div>
            
        </div>
    )
}

export default Home