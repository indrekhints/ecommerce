import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch, HashRouter, Routes } from 'react-router-dom';

import MainNav from './components/MainNav';
import MainContent from './components/MainContent';
import MainFooter from './components/MainFooter';
import WomenPage from './components/WomenPage';
import MenPage from './components/MenPage';
import KidsPage from './components/KidsPage';
import LoginPage from './components/LoginPage';
import LikesPage from './components/LikesPage';
import AlertPage from './components/AlertPage';
import UserAccount from './components/UserAccount';
import VisitorShoppingCard from './components/VisitorShoppingCard';
import { MyContextProvider } from './components/MyContext';
import AddSellingItem from './components/ItemsData';
import Admin from './components/Admin';

const Ecommerse = () => {

  return (
    <React.StrictMode>
      <HashRouter>
        <MyContextProvider>
          <MainNav />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/WomenPage" element={<WomenPage />} />
            <Route path="/MenPage" element={<MenPage />} />
            <Route path="/KidsPage" element={<KidsPage />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/LikesPage" element={<LikesPage />} />
            <Route path="/AlertPage" element={<AlertPage />} />
            <Route path="/UserAccount" element={<UserAccount />} />
            <Route path="/VisitorShoppingCard" element={<VisitorShoppingCard />} />
            <Route path="/ItemsData" element={<AddSellingItem />} />
            <Route path="/ItemsData" element={<AddSellingItem />} /> {/* // Müügi item , andmebaas */}
            <Route path="/ItemsData" element={<AddSellingItem />} />
            <Route path="/Admin" element={<Admin />} />
          </Routes>
          <MainFooter />
        </MyContextProvider>
      </HashRouter>
    </React.StrictMode>
  );
}

ReactDOM.render(
  <Ecommerse />,
  document.getElementById('root')
);

reportWebVitals()
