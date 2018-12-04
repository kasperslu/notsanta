import React from 'react';
import App from '../src/components/App.js';
import SecretSantaStart from '../src/components/SecretSantaStart';

class Index extends React.PureComponent {
  render() {
    return (
      <App>
        <SecretSantaStart />
      </App>
    );
  }
};

export default Index;
