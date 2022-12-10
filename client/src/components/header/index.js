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
        <Navbar.Brand><BsHeadphones className='navLogo'/></Navbar.Brand>
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
        size='md'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal' 
        className="signup-modal">
        
        <Tab.Container defaultActiveKey='login' >
         
         <Modal.Header closeButton >
           <h3 className="loginheader">login or create an account</h3>
           </Modal.Header>
           <BsFillPersonFill className='accountPic'/>
           
          <Modal.Body>
            <Modal.Title id='signup-modal' >
            <Nav className='loginSignup'>
              <Nav.Item className="">
                  <Nav.Link eventKey='login' className='login' >Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup' className="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
            
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