import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';


function RowEntryComponent() {
    return (
        <Row className="mt-5 mb-5">
            <Col md={6}>
                <Card style={{ width: '100%', backgroundColor: 'rgba(108, 117, 125, 0.5)' }} className="text-white">
                    <Card.Body>
                        <Card.Title>Kubernetes Nedir?</Card.Title>
                        <Card.Text>
                            Kubernetes, açık kaynaklı bir konteyner orkestrasyon platformudur. Google tarafından geliştirilen bu sistem, uygulama sürekliliği sağlamak için konteynerlerin durumunu sürekli izler ve otomatik düzeltmeler yapar. Mikroservis mimarisi ile çalışan uygulamalar için özellikle önemlidir. Kubernetes, kaynak yönetimini ve ölçeklemeyi kolaylaştırır.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={6}>
                <Card style={{ width: '100%', backgroundColor: 'rgba(108, 117, 125, 0.5)' }} className="text-white">
                    <Card.Body>
                        <Card.Title>Kubectl Nedir?</Card.Title>
                        <Card.Text>
                            Kubectl, Kubernetes platformunda kullanılan bir komut satırı aracıdır. Kümeleri yönetmek, uygulamaları dağıtmak, kaynakları izlemek ve logları incelemek için kullanılır. Kubernetes sistemlerinde uygulamaların dağıtımını ve yönetimini kolaylaştıran bir araçtır. YAML veya JSON formatlarında konfigürasyon dosyalarını yüklemeye olanak tanır.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default RowEntryComponent;
