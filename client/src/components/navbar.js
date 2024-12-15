import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import kuberIcon from '../Assets/logo.png'; // Doğru dosya yolu

function MyNavbar() {
  return (
    <Navbar className="custom-navbar" variant="dark" expand="lg">
  <Container>
    <Navbar.Brand href="#home" className="d-flex align-items-center">
      <img
        src={kuberIcon} // Burada içe aktarılan logo kullanılacak
        alt="Logo"
        style={{
          width: '30px', // Logo boyutunu artırdık
          height: '30px',
          marginRight: '15px', // Margin artırıldı
        }}
      />
      Kubectl Command Search Tool
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      <Nav>
        <Nav.Link href="#kubernetes">Kubernetes Nedir?</Nav.Link>
        <Nav.Link href="#command-search">Komut Arama</Nav.Link>
        <Nav.Link href="#community">Topluluk</Nav.Link>
        <Nav.Link href="#categories">Kategoriler</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}

export default MyNavbar;
