import React, {useState, useEffect} from 'react';
import Rec from '../../components/Rec'
import Pagination from '../../components/Pagination'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch, BsHeadphones } from 'react-icons/bs'
import {useLocation} from 'react-router-dom';
const fmKey = "2097d3a5f8da51f146d0e4e47efde651";

function Results() {
    const {state} =useLocation();
    const {artistName} = state;

    const [results, setResults] =useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(5);

    useEffect(() => {
        const fetchResults = async (artist) => {
            setLoading(true);
            fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&limit=25&artist=' + artist + '&api_key=' + fmKey + '&format=json&autocorrect[1]', {})
            .then((response) => {
                return response.json();
            })
            .then(async (data) => {
                const artistArray = [];
                for(var i=0; i < 25; i++){
                    const res = await fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+data.similarartists.artist[i].name+'&api_key='+fmKey+'&format=json', {});
                    const artistData = await res.json();
                    artistArray.push(artistData);
                }
                return artistArray;
            })
            .then(data => setResults(data))
            .then(setLoading(false))
        }
        fetchResults(artistName)
    }, []);
    
    //get Current post 
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
    return (
        <div className="resultsPage" style={{ width: "75%", display:"flex" }}>
            <div style={{justifyContent:"center"}}>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="search again"
                        aria-label="search again"
                        aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                        <BsSearch />
                    </Button>
                </InputGroup>
                <h3>If you like {artistName} then you probably like</h3>
                <div style={{display:"flex"}}>
                    <Rec results={currentResults} loading={loading}/>
                </div>     
                <Pagination />
            </div>
        </div>

    )
}

export default Results