import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import kuberIcon from '../Assets/logo.png'; // Doğru dosya yolu

function MyNavbar() {
  return (
    <Navbar className="custom-navbar" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src={kuberIcon} // Burada içe aktarılan logo kullanılacak
            alt="Logo"
            style={{
              width: '45px',
              height: '45px',
              marginRight: '10px',
            }}
          />
          Kubectl Command Tool
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="#kubernetes">Kubernetes Nedir?</Nav.Link>
          <Nav.Link href="#command-search">Komut Arama</Nav.Link>
          <Nav.Link href="#categories">Kategoriler</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
