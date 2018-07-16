import React from 'react';

import appRoutes from '../Router/appRoutes';
import './App.css';
import NavBar from '../components/Navbar';

class App extends React.Component {
  render() {
    return (
      <div className="root-container">
        <NavBar />
        <div className="container">
          {appRoutes}
        </div>
      </div>
    );
  }
}

export default App;
