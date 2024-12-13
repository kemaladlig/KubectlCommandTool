import React from 'react';
import { Row, Col } from 'react-bootstrap';


function RowEntryComponent() {
    return (
        <Row className="mt-4">
            <Col md={6}>
                <div className="card" style={{ width: '100%' }}>
                    <div className="card-body">
                        <h5 className="card-title">Kubernetes Nedir?</h5>
                        <p className="card-text">
                            Kubernetes, açık kaynaklı bir konteyner orkestrasyon platformudur ve konteyner tabanlı uygulamaların dağıtımını, yönetilmesini, ölçeklendirilmesini ve otomatikleştirilmesini sağlar. Google tarafından geliştirilen Kubernetes, birden çok sunucu üzerinde çalışan konteynerleri izler, yönetir ve yüksek erişilebilirlik ile yük dengeleme sunar. Mikroservis mimarisi kullanan uygulamalar için özellikle önemlidir, çünkü farklı bileşenlerin bağımsız olarak çalışmasını ve ihtiyaç duyulduğunda ölçeklenebilmesini mümkün kılar. Kubernetes, konteynerlerin durumunu sürekli izler ve istenen durumdan sapma durumunda otomatik düzeltmeler yaparak uygulama sürekliliğini sağlar.
                        </p>
                    </div>
                </div>
            </Col>

            <Col md={6}>
                <div className='card' style={{ width: '100%' }}>
                <div className="card-body">
                        <h5 className="card-title">Kubectl Nedir?</h5>
                        <p className="card-text">
                        Kubernetes platformunda kullanılan bir komut satırı arayüzü (CLI) aracıdır. Kubernetes kümelerini yönetmek, uygulamaları dağıtmak, güncellemek, ölçeklemek ve kaynakların durumunu izlemek için kullanılır. kubectl ile pod'lar, hizmetler (services), dağıtımlar (deployments) ve diğer Kubernetes nesneleri üzerinde işlemler gerçekleştirebilir, aynı zamanda sistem loglarını izleyerek sorun giderme yapabilirsiniz. YAML veya JSON formatında hazırlanan konfigürasyon dosyalarını kolayca yükleyebilir ve Kubernetes altyapısını etkili bir şekilde kontrol edebilirsiniz. Bu araç, Kubernetes üzerinde tam kontrol sağlayarak geliştiricilere ve operasyon ekiplerine güçlü bir yönetim aracı sunar.
                        </p>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default RowEntryComponent;