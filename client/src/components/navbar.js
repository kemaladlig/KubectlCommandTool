import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import kuberIcon from '../assets/logo.png';

function MyNavbar() {
  return (
    <Navbar className="custom-navbar" variant="dark" expand="lg">
  <Container>
    <Navbar.Brand href="#" className="d-flex align-items-center">
      <img
        src={kuberIcon}
        alt="Logo"
        style={{
          width: '30px',
          height: '30px',
          marginRight: '15px',
        }}
      />
      Kubectl Command Search Tool
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <Nav>
        <Nav.Link href="#command-search">En Sık Kullanılanlar</Nav.Link>
        <Nav.Link href="https://kubernetes.io/community/" target="_blank" rel="noopener noreferrer">Topluluk</Nav.Link>
        <Nav.Link href="https://kubernetes.io/releases/download/" target="_blank" rel="noopener noreferrer">Kubernetes'i İndir</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}

export default MyNavbar;
