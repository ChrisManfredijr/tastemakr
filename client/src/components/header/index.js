import {useState} from 'react';
import { Navbar, Nav, NavDropdown, Container, Modal, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {BsHeadphones} from 'react-icons/bs'
import Login from '../Login';
import Signup from "../Signup";
import Auth from '../../utils/auth';

function Header() {
  const [showModal, setShowModal] = useState(false);

  return (
    
    
    <>
    <Navbar collapseOnSelect expand="xxl" bg="dark" variant="dark" style={{margin:"0px"}}>
      <Container fluid>
        <Navbar.Brand as={Link} to='/'><BsHeadphones className='navLogo'/></Navbar.Brand>
          <Nav>  
            {Auth.loggedIn() ? (
                <>    
                  <NavDropdown title="Account" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to='/saved'>My Acquired Tastes</NavDropdown.Item>
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
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
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