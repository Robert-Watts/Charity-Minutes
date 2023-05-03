import * as React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "./Logo";
import { Link, useParams } from 'react-router-dom'

type Props = {
  hide_buttons?: boolean
};

/**
 *
 * @param title The page title
 * @param favicon A custom Favicon for the page you're on
 */
const Navigation: React.FC<Props> = ({ hide_buttons }: Props) => {
    const { charity_id } = useParams()
    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <Logo height={"27px"}/>
          </Navbar.Brand>
          {!hide_buttons && charity_id != null && 
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to={`/${charity_id}/`}>Minutes</Nav.Link>
                  <Nav.Link as={Link} to={`/${charity_id}/members`}>Members</Nav.Link>
                  <Nav.Link as={Link} to={`/${charity_id}/about`}>About Charity</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
          }

        </Container>
      </Navbar>

    );
};

export default Navigation;
