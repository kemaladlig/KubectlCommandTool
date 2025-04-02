import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function FooterComponent() {
  return (
    <footer
      className="custom-footer"
      style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '30px 0',
        fontSize: '14px',
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="mb-3 mb-md-0">
            <h5 style={{ marginBottom: '15px' }}>Kubectl Komut Aracı</h5>
            <p style={{ margin: 0 }}>© 2024 Kubectl Komut Aracı. Tüm Hakları Saklıdır.</p>
          </Col>

          <Col md={6} className="text-md-right">
            <h5 style={{ marginBottom: '15px' }}>Kubernetes Hakkında Daha Fazla Bilgi Edinin</h5>
            <ul
              style={{
                listStyleType: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: '10px' }}>
                <a
                  href="https://kubernetes.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  Resmi Kubernetes Web Sitesi
                </a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a
                  href="https://kubernetes.io/docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  Kubernetes Dokümantasyonu
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/kubernetes/kubernetes"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  Kubernetes GitHub Deposu
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        {/* Alt metin */}
        <Row className="mt-4">
          <Col className="text-center">
            <p style={{ margin: 0, fontSize: '12px' }}>
              Kubernetes tutkunları için ❤️ ile geliştirildi.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterComponent;
