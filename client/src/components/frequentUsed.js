import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CommandCard from './commandCard';

// Most commonly used kubectl commands
const frequentCommands = [
  {
    command: 'kubectl get pods',
    description: 'List the pods in the cluster.',
    guide: 'Use this command to list the existing pods in the cluster.',
    category: 'Cluster Management',
    tags: ['get', 'pods', 'list'],
  },
  {
    command: 'kubectl get svc',
    description: 'List the services in the cluster.',
    guide: 'Use this command to list the existing services in the cluster.',
    category: 'Cluster Management',
    tags: ['get', 'services', 'list'],
  },
  {
    command: 'kubectl apply -f <file>',
    description: 'Apply resources from a YAML file.',
    guide: 'Use this command to apply resources defined in a YAML file to the cluster.',
    category: 'Resource Management',
    tags: ['apply', 'yaml', 'deploy'],
  },
  {
    command: 'kubectl logs <pod-name>',
    description: 'View the logs of a pod.',
    guide: 'Use this command to view the logs of a specific pod.',
    category: 'Debugging',
    tags: ['logs', 'pod', 'debug'],
  },
  {
    command: 'kubectl exec -it <pod-name> -- /bin/bash',
    description: 'Open an interactive terminal in a pod.',
    guide: 'Use this command to open an interactive terminal inside a pod.',
    category: 'Debugging',
    tags: ['exec', 'pod', 'bash'],
  },
  {
    command: 'kubectl delete -f <file>',
    description: 'Delete resources defined in a YAML file.',
    guide: 'Use this command to delete resources from the cluster defined in a YAML file.',
    category: 'Resource Management',
    tags: ['delete', 'yaml', 'remove'],
  },
];

function FrequentCommands() {
  return (
    <div id="command-search" className="search-component m-3 mt-5 mb-5">
      <h3 className="m-4">En Sık Kullanılan Komutlar</h3>
      <Row style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {frequentCommands.map((commandData, index) => (
          <Col key={index}>
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
