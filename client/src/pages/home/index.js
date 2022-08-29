import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch, BsHeadphones } from 'react-icons/bs';
import {Navigate, useNavigate} from "react-router-dom";
import React from 'react';


function Home() {
    const navigate = useNavigate();

    const inputRef = useRef(null);
   
    function handleClick() {
        const artist = inputRef.current.value;
        navigate('/results', {state: {artistName: artist}})
    }

    return (
        <div className="homePage" style={{ display: "flex" }}>
            <div className='TitleWrapper'>
              
                <h1 className='Title'>Tastemakr <BsHeadphones/></h1>
                <h6 className='subTitle'>New music choices made easy</h6>

                <InputGroup className="searchArtist mb-3">
                    <Form.Control
                        ref={inputRef}
                        placeholder="enter an artist"
                        aria-label="enter an artist"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={handleClick}>
                        <BsSearch />
                    </Button>
                    
                </InputGroup>
            </div>

        </div>
    )
}

export default Home