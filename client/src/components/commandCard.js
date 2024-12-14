import { Row, Col } from 'react-bootstrap';
import { FaRegCopy } from 'react-icons/fa'; // Kopyalama ve Ünlem ikonu

function MyCard() {
  /* const commandData = {
    command: 'kubectl config view -o jsonpath=\'{.users[?(@.name == "e2e")].user.password}\'',
    description: 'Get the password for the e2e user.',
    guide: 'Use jsonpath to extract the password for a specific user.',
    category: 'context and configuration',
    tags: ['jsonpath', 'user', 'password']
  }; */

  // Kopyalama fonksiyonu
  const handleCopy = () => {
    //navigator.clipboard.writeText(commandData.command);
    alert('Command copied to clipboard!');
  };

  return (
        <Row className="align-items-center m-5">
          {/* Komut ve açıklama kısmı */}
          <Col md={10}>
            <div>
              <div style={{ display: 'flex', alignItems: 'start' }}>
                <pre style={{
                  backgroundColor: '#544b60',  // Koyu tema
                  color: '#f8f9fa',             
                  padding: '10px',
                  borderRadius: '5px',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  flex: 1, // Komutun genişliğini alacak şekilde
                  marginRight: '10px', // İkonla arasına boşluk
                }}>
                  <FaRegCopy
                  size={24}
                  style={{
                    cursor: 'pointer',
                    color: '#ffffff',
                    marginLeft: '50px'
                  }}
                  onClick={handleCopy}
                />
                </pre>

              </div>
            </div>
          </Col>
        </Row>
  );
}

export default MyCard;
