import React, {useState, useEffect,useRef} from 'react';
import Rec from '../../components/Rec'
import Pagination from '../../components/Pagination'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch, BsHeadphones } from 'react-icons/bs'
import {Navigate, useNavigate} from "react-router-dom";
import {useLocation} from 'react-router-dom';
const fmKey = "2097d3a5f8da51f146d0e4e47efde651";


function Results() {
    const inputRef = useRef(null);
    const {state} = useLocation();
    const {artistName} = state;
    const [results, setResults] =useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [resultsPerPage] = useState(5);
  
    

    useEffect(() => {
        const fetchResults = async (artist) => {
            
            fetch('https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&limit=25&artist=' + artist + '&api_key=' + fmKey + '&format=json&autocorrect[1]', {})
            .then((response) => {
                setLoading(true)
                return response.json();
            })
            .then(async (data) => {
                const artistArray = [];
                for(var i=0; i < 25; i++){
                    const res = await fetch('https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+data.similarartists.artist[i].name+'&api_key='+fmKey+'&format=json', {});
                    
                    const artistData = await res.json();
                    const artistRecName = artistData.artist.name;
                    const mbid = artistData.artist.mbid;
                    //splits up bio
                    const artistBioLong = artistData.artist.bio.content;
                    const artistBioArray = artistBioLong.split(".");
                    const artistBio = artistBioArray[0] + "." + artistBioArray[1] + "." + artistBioArray[2] + "." + artistBioArray[3] + ".";
                    //gets link to lastfm
                    const link = artistData.artist.url;
            
                    const artistObject = {
                        artist: artistRecName,
                        bio: artistBio,
                        link: link,
                        artistId: mbid,
                        

                    }

                    artistArray.push(artistObject);
                    
                }
                setLoading(false)
                return artistArray;
                
            })
            .then(data => setResults(data))
            .catch(err => console.log(err));
            
        }
        fetchResults(artistName);
    }, []);

    //fix duplicated fetch calls using state
    function handleClick() {
        
        const artist = inputRef.current.value;
        navigate('/results', {state: {artistName: artist}})
        fetch('https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&limit=25&artist=' + artist + '&api_key=' + fmKey + '&format=json&autocorrect[1]', {})
            .then((response) => {
                setLoading(true)
                return response.json();
            })
            .then(async (data) => {
                const artistArray = [];
                for(var i=0; i < 25; i++){
                    const res = await fetch('https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+data.similarartists.artist[i].name+'&api_key='+fmKey+'&format=json', {});
                    
                    const artistData = await res.json();
                    const artistRecName = artistData.artist.name;
                    
                    const mbid = artistData.artist.mbid;

                    //splits up bio
                    const artistBioLong = artistData.artist.bio.content;
                    const artistBioArray = artistBioLong.split(".");
                    const artistBio = artistBioArray[0] + "." + artistBioArray[1] + "." + artistBioArray[2] + "." + artistBioArray[3] + ".";
                    //gets link to lastfm
                    const link = artistData.artist.url;

                  
                    
                    const artistObject = {
                        artist: artistRecName,
                        bio: artistBio,
                        link: link,
                        artistId: mbid,
                        resultIndex: i+1,

                    }
                    console.log(artistObject);
                    
                    artistArray.push(artistObject);
                    
                }
                setLoading(false)
                return artistArray;
                
            })
            .then(data => setResults(data))
            .catch(err => console.log(err));
        
    }
    //get Current post 
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

    //Change page 
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

   
    
    return (
        <div className="resultsPage">
            <div className='resultsTitleWrapper'>
                <h1 className='resultsTitle'>Tastemakr</h1>
            </div>
            
            <section className="searchOnResult">
                <InputGroup className="searchOnResult">
                    <Form.Control
                        ref={inputRef}
                        placeholder="search again"
                        aria-label="search again"
                        aria-describedby="basic-addon2"
                        
                    />
                    <Button variant="outline-secondary" id="Search-button button-addon2" onClick= {handleClick}>
                        <BsSearch />
                    </Button>
                </InputGroup>       
            </section>
                <h3 className='resultsIntro'>If you like {artistName} then you'll probably enjoy</h3>
                <div>
                    <Rec results={currentResults} artistName = {artistName}loading={loading}/>
                </div>     
                <Pagination resultsPerPage={resultsPerPage} totalResults={25} paginate={paginate} className="pagination"/>
        </div>

    )
}

export default Results