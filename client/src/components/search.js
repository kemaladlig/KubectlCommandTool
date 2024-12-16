import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import CommandCard from './commandCard';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCommands } from '../services/commandService';
import { searchCommands } from '../utils/fuseSearch'; 

function SearchComponent() {
  const [searchText, setSearchText] = useState('');
  const [commands, setCommands] = useState([]);
  const [filteredCommands, setFilteredCommands] = useState([]);

  // Komut verilerini axios ile elde etme işlemi
  useEffect(() => {
    const getCommands = async () => {
      try {
        const data = await fetchCommands();
        setCommands(data);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };
    getCommands();
  }, []);

  // Arama metnini ve komutları izleyip filtreleme işlemi
  useEffect(() => {
    if (commands.length > 0) {
      setFilteredCommands(searchCommands(commands, searchText));
    }
  }, [searchText, commands]);

  const handleInputChange = (e) => setSearchText(e.target.value);

  return (
    <div className="search-component m-5">

      {/* Arama metni girilen form */}
      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <FaSearch />
          </InputGroup.Text>
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
      
      {/* Arama Sonuçları */}
      <div className="results m-5 p-3">
        {searchText && filteredCommands.length === 0 ? (
          <p>Aramanıza uygun sonuç bulunamadı.</p>
        ) : (
          <AnimatePresence key={filteredCommands.length}>
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
                show: { opacity: 1, y: 0 },
              }}
            >
              {filteredCommands.map((command, index) => (
                <motion.div
                  key={index}
                  style={{
                    flex: '1 1 auto',
                    minWidth: '250px',
                    marginBottom: '0px',
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { delay: index * 0.07 } },
                  }}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                >
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
