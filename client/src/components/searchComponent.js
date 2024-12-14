import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Fuse from 'fuse.js';
import CommandCard from './commandCard'; // CommandCard bileşenini import et

function SearchComponent() {
  const [searchText, setSearchText] = useState('');
  const [commands, setCommands] = useState([]);
  const [filteredCommands, setFilteredCommands] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/commands') // Backend API'den komutları al
      .then(response => {
        setCommands(response.data); // Komutları state'e kaydet
      })
      .catch(error => {
        console.error('Veri çekme hatası:', error);
      });
  }, []);

  // Fuse.js ile arama işlemi
  useEffect(() => {
    if (commands.length > 0) {
      const fuse = new Fuse(commands, {
        includeScore: true,
        keys: ['command', 'description', 'category', 'tags'],
        threshold: 0.3, // Arama hassasiyeti
      });

      if (searchText) {
        const result = fuse.search(searchText);
        setFilteredCommands(result.map((resultItem) => resultItem.item));
      } else {
        setFilteredCommands([]); 
      }
    }
  }, [searchText, commands]); // searchText veya commands değiştiğinde çalışır

  const handleInputChange = (e) => {
    setSearchText(e.target.value); // Input değiştiğinde searchText güncelle
  };

  return (
    <div className="search-component m-5">
      <Form>
        <InputGroup className="mb-3">
          {/* Arama simgesi */}
          <InputGroup.Text id="basic-addon1">
            <FaSearch />
          </InputGroup.Text>

          {/* Arama input alanı */}
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

      {/* Arama sonuçlarını liste olarak göster */}
      <div className="results card m-5 p-3">
        {filteredCommands.length === 0 ? (
          <p>No results found</p> // Eğer sonuç yoksa kullanıcıya bilgi ver
        ) : (
          <ul className='list-group list-group-flush'>
            {filteredCommands.map((command, index) => (
              <li key={index} className='list-group-item'>
                <strong>{command.command}</strong>
                {command.description && <p>{command.description}</p>}
                {command.category && <p><strong>Category:</strong> {command.category}</p>}
                {command.tags && <p><strong>Tags:</strong> {command.tags.join(', ')}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchComponent;
