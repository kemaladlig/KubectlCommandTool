import React from 'react';
import '../Assets/commandCardStyle.css';

const JumbotronComponent = () => {
  return (
    <div className="jumbotron mt-3">
      <h1 className="display-4">Kubectl Komutlarıyla Kubernetes'i Keşfedin!</h1>
      <p className="lead">
        Kubernetes, modern uygulama geliştirme için güçlü bir platformdur ve kubectl komutları, bu platformun yönetiminde önemli bir rol oynar.
        Bu web sitesi, Kubernetes'teki en yaygın kubectl komutlarını kolayca bulmanıza yardımcı olmak için tasarlandı.
      </p>
      <hr className="my-4" />
      <p>
        Kubernetes'i kullanırken ihtiyaç duyduğunuz komutları hızlıca öğrenebilir ve uygulamanızda nasıl kullanacağınızla ilgili pratik bilgiler edinebilirsiniz.
        İster bir geliştirici, ister bir sistem yöneticisi olun, Kubernetes komutlarını öğrenmek ve etkili bir şekilde kullanmak işinizi kolaylaştıracaktır.
      </p>
      <a className="btn btn-lg btn-primary" href="https://kubernetes.io/docs/reference/kubectl/overview/" role="button">
        Kubectl Komutları Hakkında Daha Fazla Bilgi
      </a>

    </div>
  );
};

export default JumbotronComponent;
