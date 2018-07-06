import React from 'react';

import appRoutes from '../Router/appRoutes';

class App extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        {appRoutes}
      </div>
    );
  }
}

export default App;
