import React from 'react';

import appRoutes from '../Router/appRoutes';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        {appRoutes}
      </div>
    );
  }
}

export default App;
