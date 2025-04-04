import axios from 'axios';

export const fetchCommands = async () => {
  try {
    const response = await axios.get('https://api-kubectl-command-tool.duckdns.org/commands');
    return response.data;
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    throw error; 
  }
};

export default fetchCommands;