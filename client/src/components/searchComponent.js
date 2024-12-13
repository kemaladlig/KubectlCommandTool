import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import CommandCard from './commandCard'; // CommandCard bileşenini import et

function SearchComponent() {
  const [searchText, setSearchText] = useState('');

  // Komutların örnek verileri
  const commands = [
    {
      command: 'kubectl config view -o jsonpath=\'{.users[?(@.name == "e2e")].user.password}\'',
      description: 'Get the password for the e2e user.',
      guide: 'Use jsonpath to extract the password for a specific user.',
      tags: ['jsonpath', 'user', 'password']
    },
    {
      command: 'kubectl get pods',
      description: 'Get all the pods in the cluster.',
      guide: 'Use this command to list all the running pods.',
      tags: ['pods', 'list']
    },
    {
      command: 'kubectl create deployment',
      description: 'Create a new deployment in Kubernetes.',
      guide: 'This command creates a deployment based on the configuration.',
      tags: ['deployment', 'create']
    },
    {
      command: 'kubectl apply -f deployment.yaml',
      description: 'Apply configuration from a YAML file.',
      guide: 'Use this command to apply Kubernetes configurations.',
      tags: ['apply', 'yaml']
    }
  ];

  // Input değiştiğinde çalışacak fonksiyon
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="search-component m-5">
      <Form>
        <InputGroup className="mb-3">
          {/* Arama simgesi */}
          <InputGroup.Text id="basic-addon1">
            <FaSearch />
          </InputGroup.Text>
          
          {/* Input alanı */}
          <Form.Control
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="basic-addon1"
            value={searchText}
            onChange={handleInputChange}
            style={{
              fontSize: '1.25rem', 
              padding: '0.75rem',  
            }}
          />
        </InputGroup>
      </Form>

      {/* Arama sonuçları */}
      {searchText && (
        <div className="mt-2">
          {commands
            .filter((command) => command.command.toLowerCase().includes(searchText.toLowerCase()))
            .map((filteredCommand, index) => (
              <CommandCard
                key={index}
                command={filteredCommand.command}
                description={filteredCommand.description}
                guide={filteredCommand.guide}
                tags={filteredCommand.tags}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
