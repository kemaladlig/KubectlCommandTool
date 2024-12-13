import './App.css';
import MyNavbar from './components/navbar'; 
import { Container } from 'react-bootstrap';
import RowEntryComponent from './components/entry';
import FooterComponent from './components/footer';
import SearchComponent from './components/searchComponent';
import FrequentCommands from './components/commonUsedCommands';

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Container>
      <RowEntryComponent/>
      <SearchComponent/>
      <FrequentCommands/>
      </Container>
      <FooterComponent/>
    </div>
  );
}
export default App;
