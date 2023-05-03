import * as React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "./Logo";

type Props = {};

/**
 *
 * @param title The page title
 * @param favicon A custom Favicon for the page you're on
 */
const Navigation: React.FC<Props> = ({  }: Props) => {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
          {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
          <Navbar.Brand href="#home">
            <Logo height={"27px"}/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#link">Members</Nav.Link>
              <Nav.Link href="#link">Minutes</Nav.Link>
              <Nav.Link href="#home">Charity</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    );
};

export default Navigation;
