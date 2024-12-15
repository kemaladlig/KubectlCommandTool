import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Fuse from 'fuse.js';
import CommandCard from './commandCard';
import { motion, AnimatePresence } from 'framer-motion';


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
          placeholder="Komut aramak için burayı kullanabilirsiniz."
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

    {/* Arama sonuçlarını CommandCard bileşenleri olarak listele */}
    <div className="results m-5 p-3">
      {filteredCommands.length === 0 ? (
        <p>Aramanıza uygun sonuç bulunamadı.</p> // Eğer sonuç yoksa kullanıcıya bilgi ver
      ) : (
        <AnimatePresence>
          <motion.div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
            }}
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.1, // Her öğe arasında 0.1 saniye gecikme
                },
              },
            }}
          >
            {filteredCommands.map((command, index) => (
              <motion.div
                key={index}
                style={{
                  flex: '1 1 auto', // Esnek yapı
                  minWidth: '250px', // Minimum genişlik
                  marginBottom: '20px',
                }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                {/* CommandCard bileşenini kullanarak her bir komutu kart olarak göster */}
                <CommandCard
                  command={command.command}
                  description={command.description}
                  category={command.category}
                  tags={command.tags}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  </div>
);

  
}

export default SearchComponent;
