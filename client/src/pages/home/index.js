import { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch, BsHeadphones } from 'react-icons/bs';
import {Navigate, useNavigate} from "react-router-dom";
import React from 'react';
import { assertValidSDLExtension } from 'graphql/validation/validate';
const fmKey = "2097d3a5f8da51f146d0e4e47efde651";
const dbKey = "523532";

function Home() {
    const navigate = useNavigate();

    const inputRef = useRef(null);
   
    function handleClick(e) {
        e.preventDefault();
        const artist = inputRef.current.value;

        //LastFM API call
        fetch('https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&limit=100&artist=' + artist + '&api_key=' + fmKey + '&format=json&autocorrect[1]', {})
        .then((response) => {
           return response.json();
        })
        .then(async (data) => {
            //Loop through recommendend artists using last.fm data
            for(var i=0; i < 25; i++){
                //recommended artists bio
                const res = await fetch('https://theaudiodb.com/api/v1/json/'+ dbKey + '/artist-mb.php?i=' + data.similarartists.artist[i].mbid, {});
                const artistData = await res.json();
                console.log(artistData);

                //musicvideo
                const res2 = await fetch('https://theaudiodb.com/api/v1/json/523532/mvid-mb.php?i=' + data.similarartists.artist[i].mbid, {});
                const musicVideoData = await res2.json();
                console.log(musicVideoData);
                
                if(musicVideoData.mvids === null || artistData.artists === null){
                    console.log(musicVideoData + "test");
                    console.log(artistData +  "test");
                }
            }

        })
        .catch(err => console.log(err));

    }

    return (
        <div className="homePage" style={{ display: "flex" }}>
            <div className='TitleWrapper'>
              
                <h1 className='Title'>Tastemakr <BsHeadphones/></h1>
                <h6 className='subTitle'>New music choices made easy</h6>
                <form onSubmit={handleClick}>
                <InputGroup className="searchArtist mb-3">
                    <Form.Control
                        ref={inputRef}
                        placeholder="enter an artist"
                        aria-label="enter an artist"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2" type="submit" onClick={handleClick}>
                        <BsSearch />
                    </Button>
                </InputGroup>
                </form>
            </div>

        </div>
    )
}

export default Home