import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BsHeadphones} from 'react-icons/bs'
function Header() {
  return (
    <Navbar collapseOnSelect expand="xxl" bg="dark" variant="dark" style={{margin:"0px"}}>
      <Container>
        <Navbar.Brand href="/"><BsHeadphones className='navLogo'/></Navbar.Brand>
        
        
          <Nav className="me-auto">
            
          </Nav>
          <Nav>
          <NavDropdown title="Account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout" style={{color:"red"}}>
                logout 
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        
      </Container>
    </Navbar>
  );
}

export default Header;