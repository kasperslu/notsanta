import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import api from '../src/api';
import App from '../src/components/App.js';
import SecretSantaDraw from '../src/components/SecretSantaDraw';

class SecretSanta extends React.PureComponent {
  render() {
    const { secretSantaGroup } = this.props;

    return (
      <App>
        <SecretSantaDraw secretSantaGroup={secretSantaGroup} />
      </App>
    );
  }
}

SecretSanta.getInitialProps = async ({ query }) => {
  const data = await api.getSecretSanta(query.secretSantaGroupId);

  return { secretSantaGroup: data };
}

SecretSanta.propTypes = {
  secretSantaGroup: PropTypes.shape().isRequired,
};

export default withRouter(SecretSanta);
