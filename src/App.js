import './App.css';
import MainContent from './components/MainContent';
import MainNav from './components/MainNav';
import MainFooter from './components/MainFooter';
import MenPage from './components/MenPage';
import WomenPage from './components/WomenPage';
import KidsPage from './components/KidsPage';
import LoginPage from './components/LoginPage';
import { MyContextProvider } from './components/MyContext';



function App() {
  return (

    <div className="App container-fluid">
      <div className="row">
        <div className="col">
          <MainNav />
        </div>
      </div>
      <div className="row">
        <div className="col" style={{ minHeight: '400px' }}>
          <MainContent />
        </div>

      </div>
      <div className="row">
        <div className="col">
          <MainFooter />
        </div>
      </div>
    </div>

  );
}

export default App;
