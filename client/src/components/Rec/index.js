import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsFillArrowUpRightSquareFill as ArrowLink } from 'react-icons/bs'
import { saveTasteIds, getSavedTasteIds } from "../../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_TASTE } from "../../utils/mutations";
import Auth from '../../utils/auth';

const Rec = ({ results, loading }) => {


  const [saveTaste] = useMutation(SAVE_TASTE);
  const [savedTasteIds, setSavedTasteIds] = useState(getSavedTasteIds());
  const [resultNumber, setResultNumber] = useState(1);




  useEffect(() => {
    return () => saveTasteIds(savedTasteIds);
  });

  const handleSaveTaste = async (result) => {
    console.log(result);
    
    const tasteToSave = result;

    

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    

    if (!token) {
      console.log("no token")
      return false;
    }

    try {
      await saveTaste({
        variables: { input: tasteToSave },
      });

      setSavedTasteIds([...savedTasteIds, tasteToSave.artistId]);
    } catch (err) {
      console.error(err);

    }

  };


  if (loading) {
    return (
      <div className='loadingPage'>

        <div className="loader"></div>


        <h2 className='textLoader'>Loading your recomendations</h2>

      </div>
    );
  } else {
    return (
      results.map((result, index) => (
       <Card key={index} className="resultCard" >
          <Card.Body className='resultBody'>

            <div className='artistImageWrapper'>
              <img src={result.image} height="250px"></img>
            </div>

            <div className='artistBioWrapper'>

              <Card.Title>{result.artist}</Card.Title>
              <Card.Text>
                {result.bio}
              </Card.Text>
              <div className='cardLinks'>

                <a href={"https://" + result.link} target="_blank" rel="noopener noreferrer" className='OpenLastFM' title="Vist Artist Site">
                  <ArrowLink className='toLastFM' />
                </a>

                {Auth.loggedIn() && (
                  <Button
                    disabled={savedTasteIds?.some((savedTasteId) => savedTasteId === result.artistId)}
                    className="saveBtn btn-block btn-dark"
                    onClick={() => handleSaveTaste(result)}
                  >
                    {savedTasteIds?.some((savedTasteId) => savedTasteId === result.artistId) ? "Saved" : "Save"}
                  </Button>
                )}

              </div>
            </div>
          </Card.Body>
        </Card>
      ))

    )
  }


}

export default Rec