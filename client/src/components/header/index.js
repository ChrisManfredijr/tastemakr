import {useState} from 'react';
import { Navbar, Nav, NavDropdown, Container, Modal, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {BsHeadphones, BsFillPersonFill} from 'react-icons/bs'
import Login from '../Login';
import Signup from "../Signup";
import Auth from '../../utils/auth';

function Header() {
  const [showModal, setShowModal] = useState(false);

  

  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{margin:"0px"}}>
      <Container >
        <Navbar.Brand as={Link} to='/'><BsHeadphones className='navLogo'/></Navbar.Brand>
          <Nav>  
            {Auth.loggedIn() ? (
                <>    
                  <NavDropdown title="Account" id="collasible-nav-dropdown">
                    <NavDropdown.Item  as={Link} to='/tastes'>My Acquired Tastes</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item style={{color:"red"}}onClick={Auth.logout}>Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
          </Nav>
        
      </Container>
    </Navbar>

    <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal' >
        
        <Tab.Container defaultActiveKey='login' >
         <Modal.Header className='modal-header'closeButton >
         <BsFillPersonFill className='accountPic'/>
            <Modal.Title id='signup-modal'>
            
              <Nav variant='pills' className='pills'>
             
                <Nav.Item>
                  <Nav.Link eventKey='login' className='login' >Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup' className="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
            
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <Login handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <Signup handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>

   
    
  );
}

export default Header;