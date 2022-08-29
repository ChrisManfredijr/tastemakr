import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BsHeadphones} from 'react-icons/bs'
function Header() {
  return (
    <Navbar collapseOnSelect expand="xxl" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/"><BsHeadphones/></Navbar.Brand>
        
        
          <Nav className="me-auto">
            
          </Nav>
          <Nav>
          <NavDropdown title="Account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Signup</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Signout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        
      </Container>
    </Navbar>
  );
}

export default Header;