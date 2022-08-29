import React, {useState, useEffect,useRef} from 'react';
import Rec from '../../components/Rec'
import Pagination from '../../components/Pagination'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch, BsHeadphones } from 'react-icons/bs'
import {useLocation} from 'react-router-dom';
const fmKey = "2097d3a5f8da51f146d0e4e47efde651";


function Results() {
    const inputRef = useRef(null);
    const {state} =useLocation();
    const {artistName} = state;
    const [results, setResults] =useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage] = useState(5);

    useEffect(() => {
        const fetchResults = async (artist) => {
            
            fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&limit=25&artist=' + artist + '&api_key=' + fmKey + '&format=json&autocorrect[1]', {})
            .then((response) => {
                setLoading(true)
                return response.json();
            })
            .then(async (data) => {
                const artistArray = [];
                for(var i=0; i < 25; i++){
                    const res = await fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+data.similarartists.artist[i].name+'&api_key='+fmKey+'&format=json', {});
                    
                    const artistData = await res.json();
                    const artistRecName = artistData.artist.name;
            
                    //splits up bio
                    const artistBioLong = artistData.artist.bio.content;
                    const artistBioArray = artistBioLong.split(".");
                    const artistBio = artistBioArray[0] + "." + artistBioArray[1] + "." + artistBioArray[2] + "." + artistBioArray[3] + ".";
                    //gets link to lastfm
                    const link = artistData.artist.url;

                    //on tour?
                    const onTour = artistData.artist.onTour;

                    const artistObject = {
                        name: artistRecName,
                        bio: artistBio,
                        link: link,
                        onTour: onTour,
                        resultIndex: i+1,

                    }

                    artistArray.push(artistObject);
                    console.log(loading);
                }
                setLoading(false)
                return artistArray;
                
            })
            .then(data => setResults(data))
            
        }
        fetchResults(artistName);
    }, []);

  
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
                    <Button variant="outline-secondary" id="button-addon2">
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