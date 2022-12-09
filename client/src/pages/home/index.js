import { useRef, useState } from 'react';
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
  
    const [loading, setLoading] = useState(false);
    const [results, setResults] =useState([]);
    const inputRef = useRef(null);
   
    function handleClick(e) {
        e.preventDefault();
        setLoading(true);
        const artist = inputRef.current.value;
        //LastFM API call
        fetch('https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&limit=100&artist=' + artist + '&api_key=' + fmKey + '&format=json&autocorrect[1]', {})
        .then((response) => {
           return response.json();
        })
        .then(async (data) => {
            var artistArray = [];

            //Loop through recommendend artists using last.fm data
            var limit = 25;
            var resultNumber = 1;
            for(var i=0; i < limit; i++) {             
                //recommended artists bio
                const res = await fetch('https://theaudiodb.com/api/v1/json/'+ dbKey + '/artist-mb.php?i=' + data.similarartists.artist[i].mbid, {});

                const artistData = await res.json();
                
                //if not results for a given artist, go to next one
                if(artistData.artists === null){
                    limit++;
                }else{
                    const artistObject = {
                        result: resultNumber,
                        artist: artistData.artists[0].strArtist,
                        bio: artistData.artists[0].strBiographyEN,
                        link: artistData.artists[0].strWebsite,
                        image: artistData.artists[0].strArtistThumb,
                        logo: artistData.artists[0].strArtistLogo,
                        
                    }
                    resultNumber++;
                    artistArray.push(artistObject);
                }
           
            }
            setLoading(false)
            return artistArray;
        })
        .then(data => setResults(data))
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