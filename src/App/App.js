import React from 'react';

import appRoutes from '../Router/appRoutes';
import 'react-table/react-table.css';
import './App.css';
import '../styles/buttons.css';
import '../styles/card.css';
import '../styles/navbar.css';

import NavBar from '../components/Navbar';

class App extends React.Component {
  render() {
    return (
      <div className="root-container">
        <NavBar />
        <div>
          {appRoutes}
        </div>
      </div>
    );
  }
}

export default App;
