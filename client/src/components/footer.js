import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function FooterComponent() {
  return (
    <footer className='custom-footer' style={{ backgroundColor: '#343a40', color: 'white', padding: '20px 0' }}>
      <Container>
        <Row className="align-items-center">
          {/* Sol taraf - Başlık ve Telif Hakkı */}
          <Col md={6} className="mb-3 mb-md-0">
            <h5>Kubectl Command Tool</h5>
            <p>© 2024 Kubectl Command Tool. All Rights Reserved.</p>
          </Col>

          {/* Sağ taraf - Kubernetes Linkleri */}
          <Col md={6} className="text-md-right">
            <h5>Learn More About Kubernetes</h5>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              <li>
                <a href="https://kubernetes.io" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                  Official Kubernetes Website
                </a>
              </li>
              <li>
                <a href="https://kubernetes.io/docs/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                  Kubernetes Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com/kubernetes/kubernetes" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                  Kubernetes GitHub Repository
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterComponent;
