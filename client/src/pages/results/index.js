import Rec from '../../components/Rec'
import Pagination from '../../components/Pagination'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch, BsHeadphones } from 'react-icons/bs'
function Results() {
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
                <h3>If you like ... then you probably like</h3>
                <div style={{display:"flex"}}>
                    <Rec />
                </div>     
                <Pagination />
            </div>
        </div>

    )
}

export default Results