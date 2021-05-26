import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export class Navigation extends React.Component {

  render () {
    return(
        <Navbar collapseOnSelect expand='sm' bg='dark' variant='dark'>
          <Container>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav>
                <Nav.Link href='/notices'>Notices</Nav.Link>
                <Nav.Link href='/newest'>Newest</Nav.Link>
                <Nav.Link href='/ask'>Ask</Nav.Link>
                <Nav.Link href='/submit'>Submit</Nav.Link>
                <Nav.Link href='/users/1'>User Profiles</Nav.Link>
              </Nav>
            </Navbar.Collapse>

          </Container>
        </Navbar>
    );
  }
}
