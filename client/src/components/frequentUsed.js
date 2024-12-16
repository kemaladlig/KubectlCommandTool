import React from 'react';
import {Row, Col } from 'react-bootstrap';
import CommandCard from './commandCard'; // CommandCard bileşenini import et

// Sık kullanılan komutlar
const frequentCommands = [
  {
    command: 'kubectl config view',
    description: 'Show Merged kubeconfig settings.',
    guide: 'Use this command to view merged kubeconfig settings.',
    category: 'context and configuration',
    tags: ['kubeconfig', 'view']
  },
  {
    command: 'KUBECONFIG=~/.kube/config:~/.kube/kubconfig2',
    description: 'Use multiple kubeconfig files at the same time and view merged config.',
    guide: 'Set the KUBECONFIG environment variable to use multiple config files.',
    category: 'context and configuration',
    tags: ['kubeconfig', 'multiple']
  },
  {
    command: 'kubectl config view -o jsonpath=\'{.users[?(@.name == "e2e")].user.password}\'',
    description: 'Get the password for the e2e user.',
    guide: 'Use jsonpath to extract the password for a specific user.',
    category: 'context and configuration',
    tags: ['jsonpath', 'user', 'password']
  },
  {
    command: 'kubectl config view --raw',
    description: 'Show merged kubeconfig settings and raw certificate data and exposed secrets.',
    guide: 'This command displays the raw merged kubeconfig settings.',
    category: 'context and configuration',
    tags: ['kubeconfig', 'raw', 'certificate']
  },
  {
    command: 'kubectl config view -o jsonpath=\'{.users[?(@.name == "e2e")].user.password}\'',
    description: 'Get the certificate for the e2e user.',
    guide: 'Use jsonpath to fetch certificate information for the specified user.',
    category: 'context and configuration',
    tags: ['jsonpath', 'user', 'certificate']
  }
];

function FrequentCommands() {
  return (
    <div className="search-component m-3 mt-5">
      <h3>En Sık Kullanılan Komutlar</h3>
      <Row>
        {frequentCommands.map((commandData, index) => (
          <Col key={index} sm={12} md={12} lg={12} className="d-flex">
            <CommandCard
              command={commandData.command}
              description={commandData.description}
              guide={commandData.guide}
              category={commandData.category}
              tags={commandData.tags}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default FrequentCommands;

