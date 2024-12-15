import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import MyNavbar from './components/navbar'; 
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import RowEntryComponent from './components/entry';
import FooterComponent from './components/footer';
import SearchComponent from './components/searchComponent';
import FrequentCommands from './components/commonUsedCommands';
import JumbotronComponent from './components/entryJumbotron';

function App() {
  return (
    <div className="App">
      <MyNavbar/>
      <ToastContainer/>
      <Container>
      <JumbotronComponent/>
      <SearchComponent/>
      <RowEntryComponent/>
      <FrequentCommands/>
      </Container>
      <FooterComponent/>
    </div>
  );
}
export default App;
